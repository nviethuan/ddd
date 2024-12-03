import { Logger } from '@nestjs/common';
import { UserCliService } from 'apps/cli/src/application/services/user/user.service';
import { QuestionName } from 'apps/cli/src/utils/question-name';
import { CreateUserDto } from '@modules/user/domain/dtos/create-user.dto';
import { CommandRunner, InquirerService, SubCommand } from 'nest-commander';

export class CreateUserOptions extends CreateUserDto {
  phone?: string;
  email?: string;
  password?: string;
  isRoot?: boolean;
}

@SubCommand({ name: 'create', aliases: ['c'], description: 'Create a new user' })
export class CreateUserCmd extends CommandRunner {
  constructor(
    private readonly logService: Logger,
    private readonly inquirer: InquirerService,
    private readonly userCliService: UserCliService,
  ) {
    super();
  }

  async run(): Promise<void> {
    try {
      const user: CreateUserOptions = await this.inquirer.ask(QuestionName.CREATE_USER, undefined);
      this.logService.verbose('Creating user...');
      await this.userCliService.createUser(user);
      this.logService.verbose('User created successfully');
      process.exit(0);
    } catch (error) {
      this.logService.error(error);
      process.exit(1);
    }
  }
}
