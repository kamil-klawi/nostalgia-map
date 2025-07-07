import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { cwd } from "node:process";
import { TypeOrmModule } from "@nestjs/typeorm";

// Modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MemoriesModule } from './memories/memories.module';
import { CategoriesModule } from './categories/categories.module';
import { MailModule } from './mail/mail.module';

// Entities
import { User } from "./users/entity/user.entity";
import { Memory } from "./memories/entity/memory.entity";
import { Category } from "./categories/entity/category.entity";
import { Reaction } from "./memories/entity/reaction.entity";
import { VerificationCode } from "./auth/entity/verification-code.entity";

// Services
import { AppService } from './app.service';

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
          entities: [User, Memory, Category, Reaction, VerificationCode],
          synchronize: true,
        }),
      }),
      UsersModule,
      AuthModule,
      MemoriesModule,
      CategoriesModule,
      MailModule,
  ],
  providers: [AppService],
})
export class AppModule {}
