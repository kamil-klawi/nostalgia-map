import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMemoryDto {
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    city: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    country: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    photoUrl?: string[];

    @IsNumber()
    @IsOptional()
    categoryId?: number;
}