import { Module } from '@nestjs/common';
import { UserService } from './infrastructure/ports/user.service';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
