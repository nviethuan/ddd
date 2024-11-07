import { Module } from '@nestjs/common';
import { LoginPasswordService } from './application/services/login-password.service';
import { LoginPasswordController } from './infrastructure/login-password.controller';

@Module({
  controllers: [LoginPasswordController],
  providers: [LoginPasswordService],
})
export class LoginPasswordModule {}
