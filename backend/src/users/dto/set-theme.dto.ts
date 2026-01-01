import { IsBoolean, IsString } from 'class-validator';

export class SetThemeDto {
  @IsString()
  username: string;

  @IsBoolean()
  themeDarkMode: boolean;
}
