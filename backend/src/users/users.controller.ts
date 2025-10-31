import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './users.entity';

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

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('getUserData')
  async getUser(
    @Req() req: Request & { user: { sub: number; username: string } },
  ): Promise<{ statusCode: number; user: User | null }> {
    const user = await this.usersService.findOne(req['user'].username);

    return {
      statusCode: 200,
      user,
    };
  }
}
