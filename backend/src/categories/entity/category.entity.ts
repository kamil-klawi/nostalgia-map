import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Memory } from "../../memories/entity/memory.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    name: string;

    @OneToMany(() => Memory, memory => memory.category)
    memories: Memory[];
}