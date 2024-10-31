import { Test, TestingModule } from '@nestjs/testing';
import { BinanceSubService } from './binance-sub.service';

describe('BinanceSubService', () => {
  let service: BinanceSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinanceSubService],
    }).compile();

    service = module.get<BinanceSubService>(BinanceSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
