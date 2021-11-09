import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { Payload } from './jwt/jwt.payload';
import * as crypto from 'crypto';

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

    const encryptedSubId = crypto
      .createHmac('sha256', subId)
      .update('json')
      .digest('base64');

    const exist = await this.usersRepository.findOne({
      where: { provider, subId: encryptedSubId, deletedAt: null },
    });
    if (!exist) {
      await this.usersRepository.save({
        provider,
        subId: encryptedSubId,
        profileImageUrl,
      });
    }

    const user = await this.usersRepository.findOne({
      select: ['id', 'name', 'profileImageUrl'],
      where: { provider, subId: encryptedSubId, deletedAt: null },
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
