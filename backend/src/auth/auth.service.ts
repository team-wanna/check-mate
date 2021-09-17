import { Injectable } from '@nestjs/common';
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

  async googleLogin(req) {
    if (!req.user) {
      return { message: 'No user from google' };
    }

    const { email, firstName, lastName, profileImageUrl } = req.user;

    const exist = await this.usersRepository.findOne({
      where: { email, deletedAt: null },
    });
    if (!exist) {
      await this.usersRepository.save({
        provider: 'google',
        email,
        name: `${firstName} ${lastName}`,
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
