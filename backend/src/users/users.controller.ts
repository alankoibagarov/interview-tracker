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
import { SetThemeDto } from './dto/set-theme.dto';

interface AuthenticatedRequest extends Request {
  user: { sub: number; username: string };
}
interface UploadedFileType {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('setTheme')
  signIn(@Body() signInDto: SetThemeDto) {
    return this.usersService.setTheme(
      signInDto.username,
      signInDto.themeDarkMode,
    );
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('getUserData')
  async getUser(
    @Req() req: AuthenticatedRequest,
  ): Promise<{ statusCode: number; user: User | null }> {
    const user = await this.usersService.findOne(req['user'].username);

    return {
      statusCode: 200,
      user,
    };
  }

  @UseGuards(AuthGuard)
  @Post('upload-profile-picture')
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
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: UploadedFileType,
  ) {
    return this.usersService.uploadProfilePicture(
      req.user.username,
      file.filename,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('profile-picture')
  async removeProfilePicture(@Req() req: AuthenticatedRequest) {
    return this.usersService.removeProfilePicture(req.user.username);
  }
}
