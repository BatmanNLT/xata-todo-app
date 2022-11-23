import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { passwordStrength } from 'check-password-strength';
import { User, UserRole } from './user.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  async signUp(userSignupDto: UserSignUpDto) {
    const { email, password, userName } = userSignupDto;
    const passwordStrengthResult = passwordStrength(password);
    console.log(
      '🚀 ~ file: auth.service.ts ~ line 9 ~ AuthService ~ signUp ~ passwordStrengthResult',
      passwordStrengthResult,
    );
    if (
      passwordStrengthResult.value !== 'Strong' &&
      passwordStrengthResult.value !== 'Medium'
    ) {
      throw new BadRequestException('Password is too Weak');
    }
    const saltRounds = 10;
    try {
      const securePwd = await bcrypt.hash(password, saltRounds);
      const createUserPayload: User = {
        userName,
        email,
        password: securePwd,
        role: UserRole.USER,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    // Create User on xata
  }
}
