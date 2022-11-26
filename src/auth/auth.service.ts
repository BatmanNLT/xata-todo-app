import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { passwordStrength } from 'check-password-strength';
import { User, UserRole } from './user.model';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { getXataClient } from 'src/xata';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private xataClient = getXataClient({
    apiKey: this.configService.get<string>('XATA_API_KEY'),
    branch: this.configService.get<string>('XATA_DATACLIENT_BRANCH'),
  });

  async signIn(userSignInDto: UserSignInDto) {
    const { username, password } = userSignInDto;
    const loginError = 'Invalid username and/or password';
    try {
      const record = await this.xataClient.db.users
        .filter({
          username,
        })
        .getFirst();

      if (!record) {
        throw new UnauthorizedException(loginError);
      }
      const isPasswordValid = await bcrypt.compare(password, record.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(loginError);
      }
      const payload = { username: record.username, sub: record.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signUp(userSignUpDto: UserSignUpDto) {
    const { email, password, username } = userSignUpDto;
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
      const uniqueConstraintBreachRegExp = /column \[(.*)\]: is not unique/;
      const evaluationResult = uniqueConstraintBreachRegExp.exec(error.message);
      if (evaluationResult) {
        throw new BadRequestException(
          `The given ${evaluationResult[1]} already exists`,
        );
      }
      throw new InternalServerErrorException(error);
    }
  }
}
