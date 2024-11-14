import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../services/auth.service';
import { RefreshToken } from '../ports/refresh-token';

@CommandHandler(RefreshToken)
export class RefreshTokenCommandHandler implements ICommandHandler<RefreshToken> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: RefreshToken) {
    return this.authService.refreshToken(command);
  }
}
