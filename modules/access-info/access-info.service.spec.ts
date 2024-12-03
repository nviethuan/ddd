import { Test, TestingModule } from '@nestjs/testing';
import { AccessInfoService } from './access-info.service';

describe('AccessInfoService', () => {
  let service: AccessInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessInfoService],
    }).compile();

    service = module.get<AccessInfoService>(AccessInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
