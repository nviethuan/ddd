import { Module } from '@nestjs/common';
import { EmailService } from './application/services/email.service';
import { EmailController } from './application/email.controller';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
