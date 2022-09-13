import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';

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
  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    /* В идеальном случае пароль обязательно должен быть захэширован */
    if (isPasswordMatch) {
      /* Исключаем пароль из результата */
      const { password, ...result } = user;

      return user;
    }

    return null;
  }
}
