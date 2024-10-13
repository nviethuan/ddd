import { Logger } from '@nestjs/common';
import { CommandRunner, SubCommand } from 'nest-commander';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@SubCommand({ name: 'delete', aliases: ['d', 'del'], arguments: 'name', description: 'Delete a user' })
export class DeleteUserCmd extends CommandRunner {
  constructor(private readonly logService: Logger) {
    super();
  }

  async run(passedParam: string[], options?: BasicCommandOptions): Promise<void> {
    this.logService.verbose('options', options);
    this.logService.verbose('passedParam', passedParam);
    process.exit(0);
  }
}
