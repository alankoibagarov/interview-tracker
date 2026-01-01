import {
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsString,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
    message: 'Password must contain letters and numbers',
  })
  password: string;

  @IsEmail()
  email: string;
}
