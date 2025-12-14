import "reflect-metadata";
import { app } from "./app";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
    try {
        await AppDataSource.initialize();
        console.log("📦 Database connected");
    } catch (err) {
        console.error("❌ Failed to start app", err);
    }
}

bootstrap();

export default app;
