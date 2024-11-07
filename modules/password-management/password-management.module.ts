import { Module } from '@nestjs/common';
import { PasswordManagementService } from './application/services/password-management.service';
import { PasswordManagementController } from './infrastructure/password-management.controller';

@Module({
  controllers: [PasswordManagementController],
  providers: [PasswordManagementService],
})
export class PasswordManagementModule {}
