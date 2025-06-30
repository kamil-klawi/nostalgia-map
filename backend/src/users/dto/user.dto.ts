import { Exclude, Expose } from "class-transformer";

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
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}