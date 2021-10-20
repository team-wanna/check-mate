import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getCurrentUser(user) {
    return [user];
  }

  async updateUser(user, data) {
    const { id } = user;

    if (data.name) {
      const regex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/;
      if (regex.test(data.name) || data.name === '') {
        throw new BadRequestException('👻 이름을 올바르게 입력해 주세요 🌫');
      }

      const exist = await this.usersRepository.findOne({
        select: ['id', 'name'],
        where: { name: data.name },
      });
      if (exist) {
        if (exist.id !== id) {
          throw new ConflictException(
            '👻 이미 사용 중인 이름이에요! 다른 이름을 입력해 주세요 🌫',
          );
        }
      }
    }

    await this.usersRepository.update(id, {
      ...user,
      ...data,
    });

    return await this.usersRepository.find({ where: { id } });
  }

  async deleteUser(user) {
    const { id } = user;
    await this.usersRepository.softDelete(id);
    return;
  }

  async uploadProfileImage(user, profileImageFile: Express.Multer.File) {
    const { id } = user;

    const profileImageUrl = `users/${profileImageFile.filename}`;
    await this.usersRepository.update(id, {
      profileImageUrl: `http://localhost:${process.env.PORT}/media/${profileImageUrl}`,
    });

    return await this.usersRepository.find({ where: { id } });
  }
}
