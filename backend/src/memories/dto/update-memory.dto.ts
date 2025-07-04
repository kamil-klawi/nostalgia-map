import { IsArray, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateMemoryDto {
    @IsNumber()
    @IsOptional()
    latitude?: number;

    @IsNumber()
    @IsOptional()
    longitude?: number;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    city?: string;

    @IsString()
    @IsOptional()
    @MaxLength(60)
    country?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    title?: string;

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