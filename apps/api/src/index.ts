import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import { setupSwagger } from '@utils/setupSwagger';
import { Logger } from 'nestjs-pino';
import { APP__DOCS_DESCRIPTION, APP__NAME } from '@common/configs/envs';

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

  const logger = app.get(Logger);

  setupSwagger({ app, title: APP__NAME, description: APP__DOCS_DESCRIPTION });

  app.use(compression());
  app.use(helmet());

  await app.listen(3000);
  logger.debug(`App listening on http://localhost:3000`);

  return app;
}
