// typeorm.config.js
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export default new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "explorer_db",

  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],

  synchronize: false,
  logging: true,
});
