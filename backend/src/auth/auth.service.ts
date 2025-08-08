import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.entity';

export interface AuthPayload {
  userId: string;
  username: string;
}

// Mocked user list
const users: User[] = [
  {
    id: '1',
    username: 'testuser',
    passwordHash: bcrypt.hashSync('password', 10),
  },
  {
    id: '2',
    username: 'admin',
    passwordHash: bcrypt.hashSync('admin123', 10),
  },
];

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'changeme';
  private readonly jwtExpiresIn = '1d';

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  generateToken(payload: AuthPayload): string {
    const token = this.jwtService.sign(payload, {
      secret: this.jwtSecret,
      expiresIn: this.jwtExpiresIn,
    });
    return token;
  }

  verifyToken(token: string): AuthPayload | null {
    try {
      const decoded = this.jwtService.verify<User>(token, {
        secret: this.jwtSecret,
      });
      if (
        typeof decoded === 'object' &&
        decoded !== null &&
        'userId' in decoded &&
        'username' in decoded
      ) {
        return decoded as AuthPayload;
      }
      return null;
    } catch {
      return null;
    }
  }

  getUsers(): User[] {
    return users;
  }
}
