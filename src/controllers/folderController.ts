import { folderService } from "../services/folderService";

export const folderController = {
    getAll: async () => ({
        data: await folderService.getAllFolders()
    }),

    getSubfolders: async (id: string) => ({
        data: await folderService.getSubfolders(id)
    }),

    search: async (query: string) => ({
        data: await folderService.searchItems(query)
    }),

    create: async (body: { type: 'folder' | 'file'; name: string; parent_id?: string; folder_id?: string; size?: number; extension?: string }) => ({
        data: await folderService.createItem(body)
    }),

    update: async (body: { type: 'folder' | 'file'; id: string; name?: string; parent_id?: string; folder_id?: string; size?: number; extension?: string }) => ({
        data: await folderService.updateItem(body)
    }),

    delete: async (body: { type: 'folder' | 'file'; id: string }) => ({
        success: await folderService.deleteItem(body)
    })
};
