import { ApiModule } from './api.module';
import { repl } from '@nestjs/core';

async function bootstrap() {
  await repl(ApiModule);
}
bootstrap();
