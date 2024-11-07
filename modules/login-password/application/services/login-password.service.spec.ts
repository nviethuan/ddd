import { Test, TestingModule } from '@nestjs/testing';
import { LoginPasswordService } from './login-password.service';

describe('LoginPasswordService', () => {
  let service: LoginPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginPasswordService],
    }).compile();

    service = module.get<LoginPasswordService>(LoginPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
