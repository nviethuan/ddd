import { Test, TestingModule } from '@nestjs/testing';
import { PasswordManagementService } from './password-management.service';

describe('PasswordManagementService', () => {
  let service: PasswordManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordManagementService],
    }).compile();

    service = module.get<PasswordManagementService>(PasswordManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
