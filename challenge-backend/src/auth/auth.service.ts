import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const validPassword = await bcrypt.compare(pass, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Wrong password');
    } else {
      const payload = { username: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        user: payload.username,
      };
    }
  }
}
