import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
