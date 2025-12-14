import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Folder } from "./Folder.js";

@Entity({ name: "files" })
export class FileEntry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar", nullable: true })
    folder_id: string | null;

    @Column({ type: "bigint", nullable: true })
    size: number;

    @Column({ type: "varchar", nullable: true })
    extension: string;

    @ManyToOne(() => Folder, {
        onDelete: "SET NULL",
    })
    @JoinColumn({ name: "folder_id" })
    folder: Folder | null;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
