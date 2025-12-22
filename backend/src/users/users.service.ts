import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOne(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepo.create({
      username: createUserDto.username,
      passwordHash,
      email: createUserDto.email,
    });
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
