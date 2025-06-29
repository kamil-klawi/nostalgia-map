import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { cwd } from "node:process";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    ignoreEnvFile: false,
    cache: true,
    envFilePath: join(cwd(), '..', '.env.development'),
  })],
})
export class AppModule {}
