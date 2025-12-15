import { Elysia } from 'elysia'
import { folderRoutes, searchRoutes } from '../folderRoutes'

export const createTestApp = () => {
    return new Elysia()
        .use(folderRoutes)
        .use(searchRoutes)
}
