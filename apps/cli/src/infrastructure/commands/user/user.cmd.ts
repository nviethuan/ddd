import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { CreateUserCmd } from './create-user.cmd';
import { DeleteUserCmd } from './delete-user.cmd';
import { ForceChangePasswordCmd } from './force-change-password.cmd';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({
  name: 'user',
  subCommands: [CreateUserCmd, ForceChangePasswordCmd, DeleteUserCmd],
  description: 'User commands',
})
export class UserCmd extends CommandRunner {
  constructor(private readonly logService: Logger) {
    super();
  }

  async run(passedParam: string[], options?: BasicCommandOptions): Promise<void> {
    this.logService.verbose('options', options);
    this.logService.verbose('passedParam', passedParam);
    // process.exit(0);
  }
}
