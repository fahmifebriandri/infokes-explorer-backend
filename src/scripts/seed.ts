import "reflect-metadata";
import { AppDataSource } from "../config/data-source";
import { Folder } from "../entities/Folder";
import { FileEntry } from "../entities/FileEntry";

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log("📦 Database connected for seeding");

        const folderRepo = AppDataSource.getRepository(Folder);
        const fileRepo = AppDataSource.getRepository(FileEntry);

        // Clear existing data
        await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0');
        await AppDataSource.query('DELETE FROM files');
        await AppDataSource.query('DELETE FROM folders');
        await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log("🗑️  Cleared existing data");

        // Insert folders
        const folders = [
            { id: '6c1a8b8e-3d8f-4c7e-9f4a-6f7c3e5a91d2', name: 'Root', parent_id: null },
            { id: 'b7f29a44-0a6f-4d3c-9e2b-8a9e3fcb5a21', name: 'Documents', parent_id: '6c1a8b8e-3d8f-4c7e-9f4a-6f7c3e5a91d2' },
            { id: '2d9e4c1a-5b77-4f32-8e1b-3a4e7c2f9184', name: 'Pictures', parent_id: '6c1a8b8e-3d8f-4c7e-9f4a-6f7c3e5a91d2' },
            { id: '9a6f71e2-1b33-4a2c-8e0f-7e3c4a5b1d90', name: 'Work', parent_id: 'b7f29a44-0a6f-4d3c-9e2b-8a9e3fcb5a21' },
            { id: '4c5b9a6e-2f19-4c41-9d1a-8b3e2a7f6c54', name: 'Personal', parent_id: 'b7f29a44-0a6f-4d3c-9e2b-8a9e3fcb5a21' },
            { id: 'd1f7b8a2-4c61-4e3b-9f52-6a3e8c5b9174', name: '2024', parent_id: '9a6f71e2-1b33-4a2c-8e0f-7e3c4a5b1d90' },
            { id: 'e8a3c9b1-7f52-4e0a-8d4b-2c6f5a9173e4', name: 'Vacations', parent_id: '2d9e4c1a-5b77-4f32-8e1b-3a4e7c2f9184' }
        ];

        await folderRepo.save(folders);
        console.log("📁 Folders seeded");

        // Insert files
        const files = [
            { id: '3f7a2b1e-9c8d-4f2e-8a5c-6b9e1d4a7f32', name: 'resume.pdf', folder_id: 'b7f29a44-0a6f-4d3c-9e2b-8a9e3fcb5a21', size: 102400, extension: 'pdf' },
            { id: '8c5a3d1b-6f72-4e9a-9c4b-2e7a1f8d3b90', name: 'photo1.jpg', folder_id: '2d9e4c1a-5b77-4f32-8e1b-3a4e7c2f9184', size: 204800, extension: 'jpg' },
            { id: 'f2a9e6b1-4d3c-4c8e-8b9a-1e7f5d3a9204', name: 'presentation.pptx', folder_id: '9a6f71e2-1b33-4a2c-8e0f-7e3c4a5b1d90', size: 512000, extension: 'pptx' }
        ];

        await fileRepo.save(files);
        console.log("📄 Files seeded");

        console.log("✅ Seeding completed successfully");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        process.exit(0);
    }
}

seed();