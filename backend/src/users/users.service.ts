import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserRole } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { unlink } from 'fs/promises';
import { join } from 'path';

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
      role: UserRole.USER,
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

    await this.userRepo.update(user.id, { themeDarkMode });

    return {
      statusCode: 200,
    };
  }

  async uploadProfilePicture(username: string, filename: string) {
    const user = await this.findOne(username);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.profilePicture) {
      // Delete old picture if exists
      try {
        const oldFilePath = join(
          process.cwd(),
          'uploads',
          user.profilePicture.replace('/uploads/', ''),
        );
        await unlink(oldFilePath);
      } catch (error) {
        // File might not exist, ignore error
        console.log('Could not delete old profile picture:', error);
      }
    }

    const profilePicturePath = `/uploads/${filename}`;
    await this.userRepo.update(user.id, { profilePicture: profilePicturePath });

    return {
      statusCode: 200,
      profilePicture: profilePicturePath,
    };
  }

  async removeProfilePicture(username: string) {
    const user = await this.findOne(username);
    if (!user) {
      throw new Error('User not found');
    }

    // Delete file from disk
    if (user.profilePicture) {
      try {
        const filePath = join(
          process.cwd(),
          'uploads',
          user.profilePicture.replace('/uploads/', ''),
        );
        await unlink(filePath);
      } catch (error) {
        // File might not exist, log but continue
        console.log('Could not delete profile picture file:', error);
      }
    }

    await this.userRepo.update(user.id, { profilePicture: null });

    return {
      statusCode: 200,
    };
  }
}
