import { Logger } from '@nestjs/common';
import { GroupCliService } from 'apps/cli/src/application/services/group/group.service';
import { CommandRunner, Option, SubCommand } from 'nest-commander';

interface CreateGroupOptions {
  description?: string;
  hidden?: boolean;
}

@SubCommand({ name: 'create', aliases: ['c'], arguments: 'name', description: 'Create a new group' })
export class CreateGroupCmd extends CommandRunner {
  constructor(
    private readonly logService: Logger,
    private readonly cliGroupService: GroupCliService,
  ) {
    super();
  }

  async run(passedParam: string[], options: CreateGroupOptions): Promise<void> {
    try {
      const group = await this.cliGroupService.createGroup(passedParam[0], options.description, options.hidden);
      this.logService.verbose(group);
      process.exit(0);
    } catch (error) {
      this.logService.error(error);
      process.exit(1);
    }
  }

  @Option({
    flags: '-d, --description [description]',
    description: 'Description of the group',
  })
  parseDescription(val: string): string {
    return val;
  }

  @Option({
    flags: '-h, --hidden',
    description: 'Hidden group',
  })
  parseHidden(val: string): boolean {
    return val === 'true';
  }
}
