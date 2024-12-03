import { Test, TestingModule } from '@nestjs/testing';
import { AccessInfoController } from './access-info.controller';
import { AccessInfoService } from './access-info.service';

describe('AccessInfoController', () => {
  let controller: AccessInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessInfoController],
      providers: [AccessInfoService],
    }).compile();

    controller = module.get<AccessInfoController>(AccessInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
