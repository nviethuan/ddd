import { Test, TestingModule } from '@nestjs/testing';
import { LoginPasswordController } from './login-password.controller';
import { LoginPasswordService } from '../application/services/login-password.service';

describe('LoginPasswordController', () => {
  let controller: LoginPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginPasswordController],
      providers: [LoginPasswordService],
    }).compile();

    controller = module.get<LoginPasswordController>(LoginPasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
