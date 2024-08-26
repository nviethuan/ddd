import { NestFactory } from '@nestjs/core';
import { OpenApiModule } from './open-api.module';
import { generateOpenApi } from '@utils/openApiGenerator';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(8089);
  Logger.log(`App listening on http://localhost:8089`);
}
bootstrap();
