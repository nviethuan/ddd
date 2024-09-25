import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli.module';

export async function bootstrap() {
  await CommandFactory.run(CliModule, ['warn', 'error', 'debug', 'log', 'verbose', 'fatal']);
}

// example: yarn cli basic hello
