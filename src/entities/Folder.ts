import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "folders" })
export class Folder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar", nullable: true })
    parent_id: string | null;

    @ManyToOne(() => Folder, folder => folder.children, {
        onDelete: "SET NULL",
    })
    @JoinColumn({ name: "parent_id" })
    parent: Folder | null;

    @OneToMany(() => Folder, folder => folder.parent)
    children: Folder[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
