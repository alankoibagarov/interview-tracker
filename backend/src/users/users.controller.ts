import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('setTheme')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.usersService.setTheme(
      signInDto.username,
      signInDto.themeDarkMode,
    );
  }
}
