import { AppDataSource } from "../config/data-source";
import { Folder } from "../entities/Folder";
import { FileEntry } from "../entities/FileEntry";

export const folderRepository = {
    getAllFolders: async () => {
        const repo = AppDataSource.getRepository(Folder);
        return repo.find({
            order: { id: "ASC" }
        });
    },

    getAllFiles: async () => {
        const fileRepo = AppDataSource.getRepository(FileEntry);
        return fileRepo.find({
            order: { id: "ASC" }
        });
    },

    getFolderById: async (id: string) => {
        const repo = AppDataSource.getRepository(Folder);
        return repo.findOne({ where: { id } });
    },

    getSubfolders: async (parentId: string) => {
        const repo = AppDataSource.getRepository(Folder);
        return repo.find({
            where: { parent_id: parentId },
            order: { id: "ASC" }
        });
    },

    getFilesInFolder: async (folderId: string) => {
        const fileRepo = AppDataSource.getRepository(FileEntry);
        return fileRepo.find({
            where: { folder_id: folderId },
            order: { id: "ASC" }
        });
    },

    getFilesInFolders: async (folderIds: string[]) => {
        const fileRepo = AppDataSource.getRepository(FileEntry);
        return fileRepo.createQueryBuilder("file")
            .where("file.folder_id IN (:...folderIds)", { folderIds })
            .orderBy("file.folder_id", "ASC")
            .addOrderBy("file.id", "ASC")
            .getMany();
    },

    searchFolders: async (query: string) => {
        const repo = AppDataSource.getRepository(Folder);
        return repo.createQueryBuilder("folder")
            .where("folder.name LIKE :query", { query: `%${query}%` })
            .orderBy("folder.id", "ASC")
            .getMany();
    },

    searchFiles: async (query: string) => {
        const fileRepo = AppDataSource.getRepository(FileEntry);
        return fileRepo.createQueryBuilder("file")
            .where("file.name LIKE :query", { query: `%${query}%` })
            .orderBy("file.id", "ASC")
            .getMany();
    },

    createFolder: async (data: { name: string; parent_id?: string }) => {
        const repo = AppDataSource.getRepository(Folder);
        const folder = repo.create(data);
        return repo.save(folder);
    },

    createFile: async (data: { name: string; folder_id?: string; size?: number; extension?: string }) => {
        const fileRepo = AppDataSource.getRepository(FileEntry);
        const file = fileRepo.create(data);
        return fileRepo.save(file);
    },

    updateFolder: async (id: string, data: Partial<{ name: string; parent_id?: string }>) => {
        const repo = AppDataSource.getRepository(Folder);
        await repo.update(id, data);
        return repo.findOne({ where: { id } });
    },

    updateFile: async (id: string, data: Partial<{ name: string; folder_id?: string; size?: number; extension?: string }>) => {
        const fileRepo = AppDataSource.getRepository(FileEntry);
        await fileRepo.update(id, data);
        return fileRepo.findOne({ where: { id } });
    },

    deleteFolder: async (id: string) => {
        const repo = AppDataSource.getRepository(Folder);
        const result = await repo.delete(id);
        return (result.affected ?? 0) > 0;
    },

    deleteFile: async (id: string) => {
        const fileRepo = AppDataSource.getRepository(FileEntry);
        const result = await fileRepo.delete(id);
        return (result.affected ?? 0) > 0;
    }
};
