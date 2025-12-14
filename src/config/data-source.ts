import "reflect-metadata";
import { DataSource } from "typeorm";
import { Folder } from "../entities/Folder";
import { FileEntry } from "../entities/FileEntry";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,      // auto sync schema
    logging: false,
    entities: [Folder, FileEntry],
    migrations: ["src/migrations/*.ts"],
});
