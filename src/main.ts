import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AuthGuard } from './common/guards/auth.guard';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });

  app.useGlobalGuards(new AuthGuard(new Reflector()));

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: true, // throw error on unknown fields
      transform: true, // auto-transform to DTO classes
    }),
  );

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
