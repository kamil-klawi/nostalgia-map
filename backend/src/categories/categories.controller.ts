import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from "./categories.service";
import { Category } from "./entity/category.entity";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async getCategories(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }
}
