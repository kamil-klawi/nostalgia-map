import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemoriesService } from './memories.service';
import { MemoriesController } from './memories.controller';
import { Category } from "../categories/entity/category.entity";
import { Memory } from "./entity/memory.entity";
import { UsersModule } from "../users/users.module";
import { Reaction } from "./entity/reaction.entity";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Memory, Category, Reaction])
  ],
  providers: [MemoriesService],
  controllers: [MemoriesController],
  exports: [MemoriesService],
})
export class MemoriesModule {}
