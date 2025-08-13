import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = this.authService.generateToken({
      userId: user.id,
      username: user.username,
    });
    return { success: true, token, statusCode: 200 };
  }

  @Get('users')
  getUsers() {
    return this.authService
      .getUsers()
      .map((u) => ({ id: u.id, username: u.username }));
  }
}
