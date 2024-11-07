import { Module } from '@nestjs/common';
import { AccountService } from './application/services/account.service';
import { AccountController } from './account.controller';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
