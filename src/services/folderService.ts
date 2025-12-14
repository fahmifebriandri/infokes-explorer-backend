import { folderRepository } from "../repositories/folderRepository";

export const folderService = {
    getAllFolders: async () => {
        const folders = await folderRepository.getAllFolders();
        const files = await folderRepository.getAllFiles();
        return {
            folders,
            files
        };
    },

    getSubfolders: async (id: string) => {
        const folder = await folderRepository.getFolderById(id);
        if (!folder) throw new Error("Folder not found");
        const subfolders = await folderRepository.getSubfolders(id);

        // Assign files to each subfolder
        const subfoldersWithFiles = subfolders.map(subfolder => ({
            ...subfolder
        }));

        // Also get files directly in the folder
        const filesInFolder = await folderRepository.getFilesInFolder(id);

        return {
            subfolders: subfoldersWithFiles,
            filesInFolder
        };
    },


    getFolderPath: async (id: string) => {
        const path = [];

        let current = await folderRepository.getFolderById(id);
        if (!current) throw new Error("Folder not found");

        while (current) {
            path.push({
                id: current.id,
                name: current.name
            });

            if (!current.parent_id) break;
            current = await folderRepository.getFolderById(current.parent_id);
        }

        return path.reverse();
    },

    searchItems: async (query: string) => {
        const folders = await folderRepository.searchFolders(query);
        const files = await folderRepository.searchFiles(query);
        return {
            folders,
            files
        };
    },

    createItem: async (data: { type: 'folder' | 'file'; name: string; parent_id?: string; folder_id?: string; size?: number; extension?: string }) => {
        if (data.type === 'folder') {
            return await folderRepository.createFolder({ name: data.name, parent_id: data.parent_id });
        } else if (data.type === 'file') {
            return await folderRepository.createFile({ name: data.name, folder_id: data.folder_id, size: data.size, extension: data.extension });
        } else {
            throw new Error('Invalid type');
        }
    },

    updateItem: async (data: { type: 'folder' | 'file'; id: string; name?: string; parent_id?: string; folder_id?: string; size?: number; extension?: string }) => {
        if (data.type === 'folder') {
            return await folderRepository.updateFolder(data.id, { name: data.name, parent_id: data.parent_id });
        } else if (data.type === 'file') {
            return await folderRepository.updateFile(data.id, { name: data.name, folder_id: data.folder_id, size: data.size, extension: data.extension });
        } else {
            throw new Error('Invalid type');
        }
    },

    deleteItem: async (data: { type: 'folder' | 'file'; id: string }) => {
        if (data.type === 'folder') {
            return await folderRepository.deleteFolder(data.id);
        } else if (data.type === 'file') {
            return await folderRepository.deleteFile(data.id);
        } else {
            throw new Error('Invalid type');
        }
    }
};
