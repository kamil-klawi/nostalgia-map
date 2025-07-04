import { Exclude, Expose, Type } from "class-transformer";
import { MemoryDto } from "../../memories/dto/memory.dto";

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Exclude()
    password: string;

    @Expose()
    avatarUrl?: string;

    @Expose()
    bio?: string;

    @Expose()
    isVerified: boolean;

    @Expose()
    @Type(() => MemoryDto)
    memories?: MemoryDto[] = [];

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}