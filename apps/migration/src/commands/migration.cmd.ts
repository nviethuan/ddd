import { Command, CommandRunner } from 'nest-commander';
import { GenCmd } from './gen.sub.cli';
import { Logger } from 'nestjs-pino';
import { UpCmd } from './up.sub';

@Command({ name: 'migration', aliases: ['m'], subCommands: [GenCmd, UpCmd], description: 'Migration commands' })
export class MigrationCmd extends CommandRunner {
  constructor(private readonly logger: Logger) {
    super();
  }

  async run(passedParam: string[], options: any): Promise<void> {
    this.logger.verbose('Migration commands', passedParam, options);
  }
}
