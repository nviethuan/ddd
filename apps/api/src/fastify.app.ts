import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import { setupSwagger } from '@utils/setupSwagger';
import { Logger } from 'nestjs-pino';
import { APP__DOCS_DESCRIPTION, APP__NAME, PORT } from '@common/configs/envs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ResponseInterceptor } from '@common/index';
import { ApiKeyGuard } from '@common/infrastructure/guards/api-key/api-key.guard';
// import { Transport } from '@nestjs/microservices';
// import { MicroserviceOptions } from '@nestjs/microservices';
// import { join } from 'path';

export async function bootstrap(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'helloworld',
  //     protoPath: join(__dirname, '../../../proto/helloworld.proto'),
  //     url: '0.0.0.0:50051',
  //   },
  // });
  app.useGlobalGuards(new ApiKeyGuard());
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

  setupSwagger('fastify', { app, title: APP__NAME, description: APP__DOCS_DESCRIPTION });

  app.use(compression());
  app.use(helmet());

  await app.listen({ port: Number(PORT) });
  logger.debug(
    `App listening on: http://localhost:${PORT} - RAM: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB`,
  );

  return app;
}
