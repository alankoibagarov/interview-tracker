import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return landing HTML', () => {
      const response = appController.getHello();
      expect(response).toContain('<!DOCTYPE html>');
      expect(response).toContain('<h1>Hello World!</h1>');
    });
  });
});
