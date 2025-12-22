import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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

  @Post('upload-profile-picture')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadProfilePicture(
    @Req() req: any,
    @UploadedFile() file: any,
  ) {
    return this.usersService.uploadProfilePicture(
      req.user.username,
      file.filename,
    );
  }

  @Delete('profile-picture')
  @UseGuards(AuthGuard)
  async removeProfilePicture(@Req() req: any) {
    return this.usersService.removeProfilePicture(req.user.username);
  }
}
