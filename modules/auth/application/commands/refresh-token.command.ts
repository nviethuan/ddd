import { RefreshToken } from '@modules/auth/domain/object-values/refresh-token';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../services/auth.service';

@CommandHandler(RefreshToken)
export class RefreshTokenCommandHandler implements ICommandHandler<RefreshToken> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: RefreshToken) {
    return this.authService.refreshToken(command);
  }
}
