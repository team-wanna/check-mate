import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async updateUser(user, data) {
    const { id } = user;

    if (data.name) {
      const exist = await this.usersRepository.findOne({
        where: { name: data.name },
      });
      if (exist) {
        if (exist.id === id) {
          throw new ConflictException('변경된 내용이 없습니다.');
        } else {
          throw new ConflictException(
            '이미 사용 중인 이름입니다. 다른 이름을 사용해 주세요.',
          );
        }
      }
    }

    await this.usersRepository.update(id, {
      ...user,
      ...data,
    });

    return await this.usersRepository.findOne(id);
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

    return await this.usersRepository.findOne(id);
  }
}
