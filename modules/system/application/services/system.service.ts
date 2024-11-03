import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from '../../domain/dto/create-system.dto';
import { UpdateSystemDto } from '../../domain/dto/update-system.dto';
import { BinanceSubService } from '@modules/binance-sub/binance-sub.service';
import { User } from '@modules/user/domain/entities/user.entity';

@Injectable()
export class SystemService {
  constructor(private readonly binanceSubService: BinanceSubService) {}

  getBinanceSystemStatus() {
    return this.binanceSubService.getStatus();
  }

  startBinanceSub(user: User) {
    return this.binanceSubService.start(user);
  }

  stopBinanceSub(user: User) {
    return this.binanceSubService.stop(user);
  }
}
