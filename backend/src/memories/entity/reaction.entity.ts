import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Memory } from "./memory.entity";
import { User } from "../../users/entity/user.entity";

@Entity()
@Unique(['memory', 'user'])
export class Reaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Memory, memory => memory.reactions, { onDelete: 'CASCADE' })
    memory: Memory;

    @ManyToOne(() => User, user => user.reactions, { eager: true, onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}