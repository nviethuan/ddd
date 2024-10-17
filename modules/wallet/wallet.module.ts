import { Module } from '@nestjs/common';
import { WalletService } from './application/services/wallet.service';
import { WalletController } from './infrastructure/wallet.controller';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
