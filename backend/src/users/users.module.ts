import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from './users.service';
import { User } from "./entity/user.entity";
import { UsersController } from './users.controller';
import { MemoriesModule } from "../memories/memories.module";

@Module({
  imports: [
      forwardRef(() => MemoriesModule),
      TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
