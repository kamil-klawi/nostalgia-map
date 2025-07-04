import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MaxLength(50)
    firstName: string;

    @IsString()
    @IsOptional()
    @MaxLength(80)
    lastName: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    avatarUrl?: string;

    @IsString()
    @IsOptional()
    bio?: string;
}