import { MigrationsModule } from './migrations.module';
import { CommandFactory } from 'nest-commander';

export async function bootstrap() {
  await CommandFactory.run(MigrationsModule, ['warn', 'error', 'debug', 'verbose', 'fatal']);
}
