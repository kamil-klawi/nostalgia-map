import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entity/user.entity";

@Entity()
export class VerificationCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 6 })
    code: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @Column()
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}