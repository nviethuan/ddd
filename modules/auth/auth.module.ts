import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { LocalLoginCommandHandler } from './application/handlers/commands/localLogin.command';

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [AuthService, LocalLoginCommandHandler],
})
export class AuthModule {}
