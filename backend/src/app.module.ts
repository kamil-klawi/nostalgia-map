import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { cwd } from "node:process";
import { TypeOrmModule } from "@nestjs/typeorm";

// Modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MemoriesModule } from './memories/memories.module';

// Entities
import { User } from "./users/entity/user.entity";
import { Memory } from "./memories/entity/memory.entity";
import { Category } from "./memories/entity/category.entity";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        ignoreEnvFile: false,
        cache: true,
        envFilePath: join(cwd(), '..', '.env.development'),
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          type: 'postgres',
          host: config.get<string>('DB_HOST', 'localhost'),
          port: config.get<number>('DB_PORT', 5432),
          username: config.get<string>('DB_USER', 'postgres'),
          password: config.get<string>('DB_PASS', 'postgres'),
          database: config.get<string>('DB_NAME', 'nostalgiamapdb'),
          entities: [User, Memory, Category],
          synchronize: true,
        }),
      }),
      UsersModule,
      AuthModule,
      MemoriesModule,
  ],
})
export class AppModule {}
