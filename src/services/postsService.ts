// /src/services/postsService.ts

import { postsRepository } from "../repositories/postsRepository";

export const postsService = {
    getAllPosts: async () => {
        const posts = await postsRepository.getAllPosts();
        return {
            posts
        };
    },

    getPostsById: async (id: string) => {
        const posts = await postsRepository.getPostById(id);
        return {
            posts
        };
    },

    createPost: async (data: { title: string; content: string }) => {
        const post = await postsRepository.createPost(data);
        return {
            post
        };
    },

    updatePost: async (
        id: string,
        data: Partial<{ title: string; content: string }>
    ) => {
        const post = await postsRepository.updatePost(id, data);

        if (!post) {
            throw new Error("Post not found");
        }

        return {
            post
        };
    },

    deletePost: async (id: string) => {
        const success = await postsRepository.deletePost(id);

        if (!success) {
            throw new Error("Post not found");
        }

        return {
            success: true
        };
    },
};
