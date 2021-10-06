import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(req) {
    if (!req.user) {
      throw new UnauthorizedException('인증 오류');
    }

    const { provider, subId, profileImageUrl } = req.user;

    const exist = await this.usersRepository.findOne({
      where: { provider, subId, deletedAt: null },
    });
    if (!exist) {
      await this.usersRepository.save({
        provider,
        subId,
        profileImageUrl,
      });
    }

    const user = await this.usersRepository.findOne({
      select: ['id', 'name', 'profileImageUrl'],
      where: { subId, deletedAt: null },
    });
    const payload: Payload = { subId, sub: user.id };
    return [
      {
        ...user,
        token: this.jwtService.sign(payload),
      },
    ];
  }
}
