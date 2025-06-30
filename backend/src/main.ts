import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port);
  logger.log(`Server started on port ${port}`);
}
bootstrap();
