import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import { setupSwagger } from '@utils/setupSwagger';
import { Logger } from 'nestjs-pino';
import { APP__DOCS_DESCRIPTION, APP__NAME, PORT } from '@common/configs/envs';
import { ResponseInterceptor } from '@common/index';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    bodyParser: true,
    rawBody: true,
  });
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'helloworld',
  //     protoPath: join(__dirname, '../../../proto/helloworld.proto'),
  //     url: '0.0.0.0:50051',
  //   },
  // });
  app.enableVersioning({
    type: VersioningType.URI,
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
  app.useGlobalInterceptors(new ResponseInterceptor());

  const logger = app.get(Logger);

  setupSwagger('express', { app, title: APP__NAME, description: APP__DOCS_DESCRIPTION });

  app.use(compression());
  app.use(helmet());

  await app.listen(PORT);
  logger.debug(`App listening on http://localhost:${PORT}`);

  return app;
}
