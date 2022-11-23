import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dtos/user-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userSignupDto: UserSignUpDto) {
    return this.authService.signUp(userSignupDto);
  }
}
