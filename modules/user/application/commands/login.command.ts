import { UserService } from '../services/user.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Login } from '../../domain/value-objects/login';

@CommandHandler(Login)
export class LoginCommandHandler implements ICommandHandler<Login> {
  constructor(private readonly userService: UserService) {}

  async execute(command: Login) {
    return this.userService.login(command);
  }
}
