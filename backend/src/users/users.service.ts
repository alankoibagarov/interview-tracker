import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
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

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
