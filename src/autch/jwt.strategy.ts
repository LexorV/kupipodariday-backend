import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt_secret',
    });
  }
  async validate(sub: any) {
    console.log(sub);
    const user = await this.usersService.findOne(sub.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
