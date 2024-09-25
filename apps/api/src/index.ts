import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import { setupSwagger } from '@utils/setupSwagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
  });
  app.enableCors();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      // Transform input data into desired data types
      transform: true,
      // Remove any properties that are not in the DTO
      whitelist: true,
    }),
  );

  setupSwagger({ app, title: process.env.APP__NAME, description: process.env.APP__DOCS_DESCRIPTION });

  app.use(compression());
  app.use(helmet());

  await app.listen(3000);
  Logger.debug(`App listening on http://localhost:3000`);

  return app;
}
