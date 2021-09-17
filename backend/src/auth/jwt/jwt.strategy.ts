import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { jwtConstants } from '../constants';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.usersRepository.findOne({
      select: [
        'id',
        'provider',
        'email',
        'name',
        'profileImageUrl',
        'intro',
        'position',
        'createdAt',
        'updatedAt',
      ],
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException('접근 오류');
    }
    return user; // request.user
  }
}
