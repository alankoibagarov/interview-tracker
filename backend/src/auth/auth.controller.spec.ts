import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: { signIn: jest.Mock };
  let usersService: { create: jest.Mock };

  beforeEach(async () => {
    authService = {
      signIn: jest
        .fn()
        .mockResolvedValue({ statusCode: 200, access_token: 'jwt' }),
    };
    usersService = {
      create: jest.fn().mockResolvedValue({
        id: 1,
        username: 'user',
        passwordHash: 'hash',
        email: 'email',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST /auth/login delegates to AuthService.signIn and returns token payload', async () => {
    const body = { username: 'user', password: 'pass' } as any;
    const result = await controller.signIn(body);
    expect(authService.signIn).toHaveBeenCalledWith('user', 'pass');
    expect(result).toEqual({ statusCode: 200, access_token: 'jwt' });
  });

  it('POST /auth/register delegates to UsersService.create', async () => {
    const dto = { username: 'new', password: 'pass', email: 'email' };
    const result = await controller.register(dto);
    expect(usersService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      id: 1,
      username: 'user',
      email: 'email',
    });
    expect(result).not.toHaveProperty('passwordHash');
  });
});
