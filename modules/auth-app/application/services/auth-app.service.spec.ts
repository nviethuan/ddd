import { Test, TestingModule } from '@nestjs/testing';
import { AuthAppService } from './auth-app.service';

describe('AuthAppService', () => {
  let service: AuthAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthAppService],
    }).compile();

    service = module.get<AuthAppService>(AuthAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
