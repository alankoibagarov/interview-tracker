import { IsEmail, MinLength, MaxLength, Matches } from 'class-validator';
export class CreateUserDto {
  @MinLength(3)
  @MaxLength(20)
  username: string;
  
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
    message: 'Password must contain letters and numbers'
  })
  password: string;
  
  @IsEmail()
  email: string;
}