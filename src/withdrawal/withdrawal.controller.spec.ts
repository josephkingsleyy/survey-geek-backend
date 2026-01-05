import { Test, TestingModule } from '@nestjs/testing';
import { WithrawalController } from './withdrawal.controller';
import { WithrawalService } from './withdrawal.service';

describe('WithrawalController', () => {
  let controller: WithrawalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WithrawalController],
      providers: [WithrawalService],
    }).compile();

    controller = module.get<WithrawalController>(WithrawalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
