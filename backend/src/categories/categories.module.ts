import { Module } from '@nestjs/common';
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entity/category.entity";
import { SeedService } from "./seed.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category])
    ],
    providers: [CategoriesService, SeedService],
    controllers: [CategoriesController],
    exports: [SeedService],
})
export class CategoriesModule {}
