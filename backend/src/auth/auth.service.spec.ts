import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

// 1) Mock bcryptjs module BEFORE importing it anywhere else.
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;

  const usersService = {
    findOne: jest.fn(),
  } as unknown as jest.Mocked<UsersService>;

  const jwtService = {
    signAsync: jest.fn().mockResolvedValue('jwt-token'),
  } as unknown as jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('signIn returns access_token when credentials are valid', async () => {
    (usersService.findOne as unknown as jest.Mock).mockResolvedValueOnce({
      id: 1,
      username: 'user',
      passwordHash: 'hash',
    });
    (bcrypt.compare as unknown as jest.Mock).mockResolvedValueOnce(true);

    const res = await service.signIn('user', 'pass');
    expect(res.statusCode).toBe(200);
    expect(res.access_token).toBe('jwt-token');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(jwtService.signAsync).toHaveBeenCalled();
  });

  it('signIn throws UnauthorizedException on invalid password', async () => {
    (usersService.findOne as unknown as jest.Mock).mockResolvedValueOnce({
      id: 1,
      username: 'user',
      passwordHash: 'hash',
    });
    (bcrypt.compare as unknown as jest.Mock).mockResolvedValueOnce(false);

    await expect(service.signIn('user', 'wrong')).rejects.toBeInstanceOf(Error);
  });

  it('signIn throws UnauthorizedException when user not found', async () => {
    (usersService.findOne as unknown as jest.Mock).mockResolvedValueOnce(null);
    await expect(service.signIn('none', 'pass')).rejects.toBeInstanceOf(Error);
  });
});
