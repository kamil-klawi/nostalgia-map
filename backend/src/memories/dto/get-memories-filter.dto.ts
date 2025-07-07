import { IsOptional, IsIn, IsNumberString } from 'class-validator';

export class GetMemoriesFilterDto {
    @IsOptional()
    @IsNumberString()
    categoryId?: number;

    @IsOptional()
    @IsIn(['newest', 'oldest', 'popular'])
    sort?: 'newest' | 'oldest' | 'popular';
}