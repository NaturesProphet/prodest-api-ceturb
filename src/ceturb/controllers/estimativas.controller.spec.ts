import { Test, TestingModule } from '@nestjs/testing';
import { EstimativasController } from './estimativas.controller';

describe('Estimativas Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [EstimativasController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: EstimativasController = module.get<EstimativasController>(EstimativasController);
    expect(controller).toBeDefined();
  });
});
