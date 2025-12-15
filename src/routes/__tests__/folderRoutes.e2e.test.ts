import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * ===============================
 * MOCK SERVICE (WAJIB DI ATAS)
 * ===============================
 */
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

import { createTestApp } from './testApp'
import { folderService } from '../../services/folderService'

/**
 * ===============================
 * E2E TEST
 * ===============================
 */
describe('E2E: Folder Routes', () => {
    const app = createTestApp()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('GET /folders', async () => {
        vi.mocked(folderService.getAllFolders).mockResolvedValue({
            folders: [],
            files: []
        })

        const res = await app.handle(
            new Request('http://localhost/folders')
        )

        expect(res.status).toBe(200)

        const body = await res.json()
        expect(body).toHaveProperty('data')
        expect(body.data.folders).toBeInstanceOf(Array)
        expect(body.data.files).toBeInstanceOf(Array)
    })

    it('GET /folders/:id/subfolder', async () => {
        vi.mocked(folderService.getSubfolders).mockResolvedValue({
            subfolders: [],
            filesInFolder: []
        })

        const res = await app.handle(
            new Request('http://localhost/folders/123/subfolder')
        )

        expect(res.status).toBe(200)

        const body = await res.json()
        expect(body.data).toHaveProperty('subfolders')
        expect(body.data).toHaveProperty('filesInFolder')
    })

    it('GET /folders/:id/path', async () => {
        vi.mocked(folderService.getFolderPath).mockResolvedValue([
            { id: '1', name: 'Root' },
            { id: '2', name: 'Child' }
        ])

        const res = await app.handle(
            new Request('http://localhost/folders/2/path')
        )

        expect(res.status).toBe(200)

        const body = await res.json()
        expect(body.data.length).toBe(2)
        expect(body.data[0].name).toBe('Root')
    })

    it('POST /folders/create (folder)', async () => {
        vi.mocked(folderService.createItem).mockResolvedValue({
            id: '1',
            name: 'New Folder'
        } as any)

        const res = await app.handle(
            new Request('http://localhost/folders/create', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    type: 'folder',
                    name: 'New Folder'
                })
            })
        )

        expect(res.status).toBe(200)

        const body = await res.json()
        expect(body.data.name).toBe('New Folder')
    })

    it('PUT /folders/update', async () => {
        vi.mocked(folderService.updateItem).mockResolvedValue({
            id: '1',
            name: 'Updated Folder'
        } as any)

        const res = await app.handle(
            new Request('http://localhost/folders/update', {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    type: 'folder',
                    id: '1',
                    name: 'Updated Folder'
                })
            })
        )

        expect(res.status).toBe(200)

        const body = await res.json()
        expect(body.data.name).toBe('Updated Folder')
    })

    it('DELETE /folders/delete', async () => {
        vi.mocked(folderService.deleteItem).mockResolvedValue(true)

        const res = await app.handle(
            new Request('http://localhost/folders/delete', {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    type: 'file',
                    id: '10'
                })
            })
        )

        expect(res.status).toBe(200)

        const body = await res.json()
        expect(body.success).toBe(true)
    })

    it('GET /folders_n_files/search', async () => {
        vi.mocked(folderService.searchItems).mockResolvedValue({
            folders: [],
            files: []
        })

        const res = await app.handle(
            new Request('http://localhost/folders_n_files/search?q=test')
        )

        expect(res.status).toBe(200)

        const body = await res.json()
        expect(body.data).toHaveProperty('folders')
        expect(body.data).toHaveProperty('files')
    })

    it('GET /folders_n_files/search without query should return 400', async () => {
        const res = await app.handle(
            new Request('http://localhost/folders_n_files/search')
        )

        expect(res.status).toBe(400)
    })
})
