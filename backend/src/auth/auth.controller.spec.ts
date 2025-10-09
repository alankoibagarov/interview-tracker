import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: { signIn: jest.Mock };

  beforeEach(async () => {
    authService = {
      signIn: jest
        .fn()
        .mockResolvedValue({ statusCode: 200, access_token: 'jwt' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST /auth/login delegates to AuthService.signIn and returns token payload', async () => {
    const body = { username: 'user', password: 'pass' } as Record<string, any>;
    const result = await controller.signIn(body);
    expect(authService.signIn).toHaveBeenCalledWith('user', 'pass');
    expect(result).toEqual({ statusCode: 200, access_token: 'jwt' });
  });
});
