import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserController } from './infrastructure/controller/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginCommandHandler } from './application/commands/login.command';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UserService, LoginCommandHandler],
  exports: [UserService],
})
export class UserModule {}
