import "reflect-metadata";
import { app } from "./app";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log("📦 Database connected");

    app.listen(PORT);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Failed to start app", err);
    process.exit(1);
  }
}

bootstrap();
