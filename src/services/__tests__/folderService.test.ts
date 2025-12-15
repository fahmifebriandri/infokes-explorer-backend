import { describe, it, expect, vi, beforeEach } from 'vitest'
import { folderService } from '../folderService'
import { folderRepository } from '../../repositories/folderRepository'

vi.mock('../../repositories/folderRepository', () => ({
    folderRepository: {
        getAllFolders: vi.fn(),
        getAllFiles: vi.fn(),
        getFolderById: vi.fn(),
        getSubfolders: vi.fn(),
        getFilesInFolder: vi.fn(),
        searchFolders: vi.fn(),
        searchFiles: vi.fn(),
        createFolder: vi.fn(),
        createFile: vi.fn(),
        updateFolder: vi.fn(),
        updateFile: vi.fn(),
        deleteFolder: vi.fn(),
        deleteFile: vi.fn()
    }
}))

describe('folderService', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('getAllFolders should return folders and files', async () => {
        vi.mocked(folderRepository.getAllFolders)
            .mockResolvedValue([{ id: '1', name: 'Root' } as any])

        vi.mocked(folderRepository.getAllFiles)
            .mockResolvedValue([{ id: '10', name: 'file.txt' } as any])

        const result = await folderService.getAllFolders()

        expect(result.folders).toHaveLength(1)
        expect(result.files).toHaveLength(1)
    })
})
