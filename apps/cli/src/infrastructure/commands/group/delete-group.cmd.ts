import { Logger } from '@nestjs/common';
import { GroupCliService } from 'apps/cli/src/application/services/group/group.service';
import { CommandRunner, Option, SubCommand } from 'nest-commander';

interface CreateGroupOptions {
  description?: string;
}

@SubCommand({ name: 'delete', aliases: ['del', 'd'], arguments: 'name', description: 'Delete a group' })
export class DeleteGroupCmd extends CommandRunner {
  constructor(
    private readonly logService: Logger,
    private readonly cliGroupService: GroupCliService,
  ) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
    try {
      const [groupname] = passedParam;

      if (groupname === 'root') {
        throw new Error('You cannot delete the root group');
      }

      const group = await this.cliGroupService.deleteGroup(groupname);
      this.logService.verbose(group);
      process.exit(0);
    } catch (error) {
      this.logService.error(error);
      process.exit(1);
    }
  }
}
