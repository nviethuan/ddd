import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { LocalLoginCommandHandler } from './application/handlers/commands/localLogin.command';
import { AuthControllerDocs } from './infrastructure/controllers/auth.controller.docs';

@Module({
  imports: [CqrsModule],
  controllers: [...(process.env.NODE_ENV === 'production' ? [AuthControllerDocs] : [AuthController])],
  providers: [AuthService, LocalLoginCommandHandler],
})
export class AuthModule {}
