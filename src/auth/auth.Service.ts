import { Injectable, ForbiddenException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    return await bcrypt.compare(password, user.password).then((matched) => {
      if (user) {
        return user;
      }
      if (!matched) {
        throw new ForbiddenException();
      }
    });
  }
}
