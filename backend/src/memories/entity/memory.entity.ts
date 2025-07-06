import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Category } from "./category.entity";
import { User } from "../../users/entity/user.entity";
import { Reaction } from "./reaction.entity";

@Entity()
export class Memory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'double precision', default: 0 })
    latitude: number;

    @Column({ type: 'double precision', default: 0 })
    longitude: number;

    @Column({ type: 'varchar', length: 100 })
    city: string;

    @Column({ type: 'varchar', length: 60 })
    country: string;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'jsonb', nullable: true })
    photoUrl?: string[];

    @OneToMany(() => Reaction, reaction => reaction.memory)
    reactions: Reaction[];

    @ManyToOne(() => Category, category => category.memories, { nullable: true })
    category?: Category;

    @ManyToOne(() => User, user => user.memories)
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}