import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { username } });
  }

  create(username: string) {
    const user = this.userRepo.create({ username });
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  async setTheme(username: string, themeDarkMode: boolean) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepo.update(user?.id, { themeDarkMode });

    return {
      statusCode: 200,
    };
  }
}
