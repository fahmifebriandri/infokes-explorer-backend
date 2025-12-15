import { describe, it, expect, vi } from 'vitest'
import { folderController } from '../folderController'
import { folderService } from '../../services/folderService'

vi.mock('../../services/folderService', () => ({
    folderService: {
        getAllFolders: vi.fn(),
        getSubfolders: vi.fn(),
        getFolderPath: vi.fn(),
        searchItems: vi.fn(),
        createItem: vi.fn(),
        updateItem: vi.fn(),
        deleteItem: vi.fn()
    }
}))

describe('folderController', () => {
    it('getAll should return data', async () => {
        vi.mocked(folderService.getAllFolders).mockResolvedValue({
            folders: [],
            files: []
        })

        const result = await folderController.getAll()

        expect(result).toHaveProperty('data')
    })
})
