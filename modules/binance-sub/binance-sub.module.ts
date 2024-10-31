import { Module } from '@nestjs/common';
import { BinanceSubService } from './binance-sub.service';

@Module({
  providers: [BinanceSubService],
})
export class BinanceSubModule {}
