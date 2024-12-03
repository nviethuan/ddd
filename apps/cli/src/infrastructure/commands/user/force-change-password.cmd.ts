import { Logger } from '@nestjs/common';
import { UserCliService } from 'apps/cli/src/application/services/user/user.service';
import { QuestionName } from 'apps/cli/src/utils/question-name';
import { CommandRunner, InquirerService, Option, Question, SubCommand } from 'nest-commander';

export interface ForceChangePasswordDto {
  username: string;
  newPassword: string;
}

@SubCommand({ name: 'password', aliases: ['p'], description: 'Force change password' })
export class ForceChangePasswordCmd extends CommandRunner {
  constructor(
    private readonly logService: Logger,
    private readonly inquirer: InquirerService,
    private readonly userCliService: UserCliService,
  ) {
    super();
  }

  async run(): Promise<void> {
    try {
      const payload: ForceChangePasswordDto = await this.inquirer.ask(QuestionName.FORCE_CHANGE_PASSWORD, undefined);
      this.logService.verbose('Starting force change password...');
      // await this.userCliService.forceChangePassword(payload);
      this.logService.verbose('Force change password successfully');
      process.exit(0);
    } catch (error) {
      this.logService.error(error);
      process.exit(1);
    }
  }

  @Option({
    flags: '-s, --shell <shell>',
    description: 'A different shell to spawn than the default',
  })
  parseShell(val: string) {
    return val;
  }

  @Question({
    message: 'What task would you like to execute?',
    name: 'task',
  })
  parseTask(val: string) {
    return val;
  }
}
