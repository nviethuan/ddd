import { Module } from '@nestjs/common';
import { RefreshTokenService } from './application/services/refresh-token.service';
import { RefreshTokenController } from './infrastructure/refresh-token.controller';

@Module({
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService],
})
export class RefreshTokenModule {}
