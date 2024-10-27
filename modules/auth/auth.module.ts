import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { RefreshTokenCommandHandler } from './application/commands/refresh-token.command';

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    // Command
    RefreshTokenCommandHandler,
  ],
})
export class AuthModule {}
