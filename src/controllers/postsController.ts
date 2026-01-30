// /src/controllers/postsController.ts

import { postsService } from "../services/postsService";

export const postsController = {
    getAll: async () => ({
        data: await postsService.getAllPosts()
    }),

    getById: async (id: string) => ({
        data: await postsService.getPostsById(id)
    }),

    create: async (body: { title: string; content: string }) => ({
        data: await postsService.createPost(body)
    }),

    update: async (
        id: string,
        body: Partial<{ title: string; content: string }>
    ) => ({
        data: await postsService.updatePost(id, body)
    }),

    delete: async (id: string) => ({
        data: await postsService.deletePost(id)
    }),
};
