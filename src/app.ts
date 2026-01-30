// src/app.ts
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { folderRoutes, searchRoutes, postsRoutes } from "./routes/folderRoutes";

export const app = new Elysia()
    .use(cors())
    .get("/health", () => ({ status: "ok" }))
    .use(folderRoutes)
    .use(searchRoutes)
    .use(postsRoutes)
    ;
