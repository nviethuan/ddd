import { Command, CommandRunner } from 'nest-commander';
import { CreateGroupCmd } from './create-group.cmd';
import { DeleteGroupCmd } from './delete-group.cmd';

@Command({ name: 'group', subCommands: [CreateGroupCmd, DeleteGroupCmd], description: 'Create a new user' })
export class GroupCmd extends CommandRunner {
  async run(passedParam: string[], options: any): Promise<void> {
    console.log('options', options);
    console.log('passedParam', passedParam);
  }
}
