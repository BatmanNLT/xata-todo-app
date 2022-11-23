import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { passwordStrength } from 'check-password-strength';
import { User, UserRole } from './user.model';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { getXataClient } from 'src/xata';
@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  private xataClient = getXataClient({
    apiKey: this.configService.get<string>('XATA_API_KEY'),
    branch: this.configService.get<string>('XATA_DATACLIENT_BRANCH'),
  });

  async signUp(userSignupDto: UserSignUpDto) {
    const { email, password, username } = userSignupDto;
    const passwordStrengthResult = passwordStrength(password);
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
        username,
        email,
        password: securePwd,
        role: UserRole.USER,
      };
      await this.xataClient.db.users.create(createUserPayload);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
