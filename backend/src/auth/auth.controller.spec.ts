import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a token for valid login', async () => {
    const result = await controller.login({
      username: 'testuser',
      password: 'password',
    });
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });

  it('should fail for invalid login', async () => {
    const result = await controller.login({
      username: 'wrong',
      password: 'wrong',
    });
    expect(result.success).toBe(false);
  });

  it('should return users', () => {
    const users = controller.getUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });
});
