import { Global, Module } from '@nestjs/common';
import { BinanceSubService } from './binance-sub.service';

const providers = [BinanceSubService];

@Global()
@Module({
  providers,
  exports: providers,
})
export class BinanceSubModule {}
