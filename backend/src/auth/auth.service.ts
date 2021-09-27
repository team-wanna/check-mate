import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/common/types/user.provider';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(req, provider: Provider) {
    if (!req.user) {
      throw new UnauthorizedException('인증 오류');
    }

    const { email, name, profileImageUrl } = req.user;

    const exist = await this.usersRepository.findOne({
      where: { email, deletedAt: null },
    });
    if (exist) {
      if (exist.email === email && exist.provider !== provider) {
        throw new UnauthorizedException('이미 가입되어 있는 이메일입니다.');
      }
    } else {
      await this.usersRepository.save({
        provider: provider,
        email,
        name,
        profileImageUrl,
      });
    }

    const user = await this.usersRepository.findOne({
      where: { email, deletedAt: null },
    });
    const payload: Payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
