import { CreateResourceDto } from '@modules/resource/domain/dto/create-resource.dto';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ResourceService } from '../services/resource.service';

export class CreateResourceCommand implements ICommand {
  constructor(public readonly createResourceDto: CreateResourceDto) {}
}

@CommandHandler(CreateResourceCommand)
export class CreateResourceCommandHandler implements ICommandHandler<CreateResourceCommand> {
  constructor(private readonly resourceService: ResourceService) {}

  async execute(command: CreateResourceCommand) {
    return this.resourceService.create(command.createResourceDto);
  }
}
