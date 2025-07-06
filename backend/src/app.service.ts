import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeedService } from "./categories/seed.service";

@Injectable()
export class AppService implements OnModuleInit {
    constructor(private readonly seedService: SeedService) {}

    async onModuleInit(): Promise<void> {
        await this.seedService.seedCategories();
        console.log('Seeding finished.');
    }
}
