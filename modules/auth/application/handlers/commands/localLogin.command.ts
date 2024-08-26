import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LocalLoginCommand } from 'modules/auth/domain/entities/localLoginCommand';
import { AuthService } from '../../services/auth.service';

@CommandHandler(LocalLoginCommand)
export class LocalLoginCommandHandler implements ICommandHandler<LocalLoginCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LocalLoginCommand) {
    return this.authService.login(command);
  }
}
