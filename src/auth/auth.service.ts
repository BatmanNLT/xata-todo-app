import { Injectable } from '@nestjs/common';
import { UserSignUpDto } from './dtos/user-signup.dto';

@Injectable()
export class AuthService {
  signUp(userSignupDto: UserSignUpDto) {
    throw new Error('Method not implemented.');
  }
}
