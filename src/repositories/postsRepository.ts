// /src/repositories/folderRepository.ts

import { AppDataSource } from "../config/data-source";
import { Post } from "../entities/Post";

export const postsRepository = {
    getAllPosts: async () => {
        const repo = AppDataSource.getRepository(Post);
        return repo.find({
            order: { created_at: "DESC" }
        });
    },

    getPostById: async (id: string) => {
        const repo = AppDataSource.getRepository(Post);
        return repo.findOne({ where: { id } });
    },

    createPost: async (data: { title: string; content: string }) => {
        const repo = AppDataSource.getRepository(Post);
        const post = repo.create(data);
        return repo.save(post);
    },

    updatePost: async (
        id: string,
        data: Partial<{ title: string; content: string }>
    ) => {
        const repo = AppDataSource.getRepository(Post);
        await repo.update(id, data);
        return repo.findOne({ where: { id } });
    },

    deletePost: async (id: string) => {
        const repo = AppDataSource.getRepository(Post);
        const result = await repo.delete(id);
        return (result.affected ?? 0) > 0;
    },
};
