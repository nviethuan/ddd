import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { inspect } from 'util';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    snapshot: true,
  });

  console.log(
    `App size: ${(inspect(app, { depth: Infinity }).length / 2 ** 20).toFixed(2)}Mb`,
  );
  await app.listen(3000);
  Logger.debug(`App listening on http://locahost:${3000}`);
}
bootstrap();
