import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';

@Module({
  providers: [BuyService],
})
export class BuyModule {}
