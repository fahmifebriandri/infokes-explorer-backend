import { Elysia, t } from "elysia";
import { folderController } from "../controllers/folderController";

export const folderRoutes = new Elysia({ prefix: "/folders" })
    .get("/", () => folderController.getAll())
    
    .get("/:id/subfolder", ({ params }) => {
        const id = params.id as string;
        return folderController.getSubfolders(id);
    })

    .get("/:id/path", ({ params }) => {
        const id = params.id as string;
        return folderController.getPath(id);
    })


    .post("/create", ({ body }) => folderController.create(body), {
        body: t.Object({
            type: t.Union([t.Literal('folder'), t.Literal('file')]),
            name: t.String(),
            parent_id: t.Optional(t.String()),
            folder_id: t.Optional(t.String()),
            size: t.Optional(t.Number()),
            extension: t.Optional(t.String())
        })
    })
    .put("/update", ({ body }) => folderController.update(body), {
        body: t.Object({
            type: t.Union([t.Literal('folder'), t.Literal('file')]),
            id: t.String(),
            name: t.Optional(t.String()),
            parent_id: t.Optional(t.String()),
            folder_id: t.Optional(t.String()),
            size: t.Optional(t.Number()),
            extension: t.Optional(t.String())
        })
    })
    .delete("/delete", ({ body }) => folderController.delete(body), {
        body: t.Object({
            type: t.Union([t.Literal('folder'), t.Literal('file')]),
            id: t.String()
        })
    });

export const searchRoutes = new Elysia()
    .get("/folders_n_files/search", ({ query, set }) => {
        const q = query.q as string;
        if (!q || q.trim() === "") {
            set.status = 400;
            return { error: "Query parameter 'q' is required" };
        }
        return folderController.search(q);
    });
