import { Test, TestingModule } from '@nestjs/testing';
import { AreaController } from './area.controller';

describe('Area Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AreaController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AreaController = module.get<AreaController>(AreaController);
    expect(controller).toBeDefined();
  });
});
