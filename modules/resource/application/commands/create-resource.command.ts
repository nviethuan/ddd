import { CreateResourceDto } from '@modules/resource/domain/dto/create-resource.dto';
import { ResourceService } from '@modules/resource/domain/services/resource.service';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

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
