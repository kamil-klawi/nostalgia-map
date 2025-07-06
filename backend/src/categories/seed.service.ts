import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Category} from "./entity/category.entity";

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    ) {}
    private readonly logger = new Logger(SeedService.name, { timestamp: true });

    async seedCategories() {
        const categories = [
            'Childhood',
            'Culture & Arts',
            'Emotions & Reflections',
            'Family & Friends',
            'History & Traditions',
            'Love & Relationships',
            'Places & Landscapes',
            'School & Education',
            'Travel & Adventure',
            'Work & Career'
        ];

        for (const name of categories) {
            const exists = await this.categoryRepository.findOne({ where: { name } });
            if (!exists) {
                const category = this.categoryRepository.create({ name });
                await this.categoryRepository.save(category);
                this.logger.log(`Added category: ${name}`);
            } else {
                this.logger.log(`Category already exist: ${name}`);
            }
        }
    }
}