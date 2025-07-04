import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemoriesService } from './memories.service';
import { MemoriesController } from './memories.controller';
import { Category } from "./entity/category.entity";
import { Memory } from "./entity/memory.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Memory, Category])
  ],
  providers: [MemoriesService],
  controllers: [MemoriesController],
  exports: [MemoriesService],
})
export class MemoriesModule {}
