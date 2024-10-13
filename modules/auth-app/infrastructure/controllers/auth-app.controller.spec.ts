import { Test, TestingModule } from '@nestjs/testing';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from 'modules/auth-app/application/services/auth-app.service';

describe('AuthAppController', () => {
  let controller: AuthAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthAppController],
      providers: [AuthAppService],
    }).compile();

    controller = module.get<AuthAppController>(AuthAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
