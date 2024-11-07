import { Test, TestingModule } from '@nestjs/testing';
import { PasswordManagementController } from './password-management.controller';
import { PasswordManagementService } from '../application/services/password-management.service';

describe('PasswordManagementController', () => {
  let controller: PasswordManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordManagementController],
      providers: [PasswordManagementService],
    }).compile();

    controller = module.get<PasswordManagementController>(PasswordManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
