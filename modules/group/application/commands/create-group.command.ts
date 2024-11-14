import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGroup } from '../ports/create-group';
import { GroupService } from '../services/group.service';

@CommandHandler(CreateGroup)
export class CreateGroupCommandHandler implements ICommandHandler<CreateGroup> {
  constructor(private readonly groupService: GroupService) {}

  async execute(command: CreateGroup) {
    return this.groupService.create(command);
  }
}
