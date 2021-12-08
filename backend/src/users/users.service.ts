import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from 'src/aws/aws.service';
import { Skill } from 'src/entities/skills.entity';
import { getConnection, Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Skill) private skillsRepository: Repository<Skill>,
    private readonly awsService: AwsService,
  ) {}

  getCurrentUser(user) {
    return [user];
  }

  async updateUser(user, data) {
    const { id } = user;

    // 유저 이름 정규 표현식, 중복 검사
    if (data.name) {
      const regex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/;
      if (regex.test(data.name) || data.name === '') {
        throw new BadRequestException('👻 이름을 올바르게 입력해 주세요 🌫');
      }

      const exist = await this.usersRepository.findOne({
        select: ['id', 'name'],
        where: { name: data.name },
      });
      if (exist && exist.id !== id) {
        throw new ConflictException(
          '👻 이미 사용 중인 이름이에요! 다른 이름을 입력해 주세요 🌫',
        );
      }
    }

    // 이메일 중복 검사
    if (data.email) {
      const exist = await this.usersRepository.findOne({
        select: ['id', 'email'],
        where: { email: data.email },
      });
      if (exist && exist.id !== id) {
        throw new ConflictException(
          '👻 이미 사용 중인 이메일이에요! 다른 이메일을 입력해 주세요 🌫',
        );
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

  async getUserSkills(id) {
    const skills = await getConnection()
      .createQueryBuilder()
      .relation(User, 'skills')
      .of(id)
      .loadMany();

    return skills;
  }

  async addUserSkill(user, data) {
    const { id } = user;

    //TODO: 사용자 존재하지 않을 경우 에러 처리 로직 추가

    const { skillName } = data;
    const skill = await this.skillsRepository.findOne({
      where: { name: skillName },
    });
    const skillId = skill.id;

    // 조인 테이블에 추가
    await getConnection()
      .createQueryBuilder()
      .relation(User, 'skills')
      .of(id)
      .add(skillId);

    return this.getUserSkills(id);
  }

  async deleteUserSkill(user, data) {
    const { id } = user;

    //TODO: 사용자 존재하지 않을 경우 에러 처리 로직 추가

    const { skillName } = data;
    const skill = await this.skillsRepository.findOne({
      where: { name: skillName },
    });
    const skillId = skill.id;

    // 조인 테이블에서 삭제
    await getConnection()
      .createQueryBuilder()
      .relation(User, 'skills')
      .of(id)
      .remove(skillId);

    return this.getUserSkills(id);
  }

  async uploadProfileImage(user, profileImageFile: Express.Multer.File) {
    const { id, profileImageUrl } = user;

    //TODO: 사용자 존재하지 않을 경우 에러 처리 로직 추가

    const key = profileImageUrl.split(
      `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/`,
    )[1];
    await this.awsService.deleteS3Object(key);

    const s3Object = await this.awsService.uploadFileToS3(
      'users',
      profileImageFile,
    );
    const newProfileImageUrl = this.awsService.getAwsS3FileUrl(s3Object.key);
    await this.usersRepository.update(id, {
      profileImageUrl: newProfileImageUrl,
    });

    return await this.usersRepository.find({ where: { id } });
  }

  async initProfileImage(user, select) {
    const { id } = user;

    //TODO: 사용자 존재하지 않을 경우 에러 처리 로직 추가

    await this.usersRepository.update(id, {
      profileImageUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/users/${select}.png`,
    });

    return await this.usersRepository.find({ where: { id } });
  }

  async getAnotherUser(id) {
    const user = await this.usersRepository.findOne({
      select: [
        'id',
        'name',
        'profileImageUrl',
        'intro',
        'createdAt',
        'updatedAt',
      ],
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('👻 존재하지 않는 회원이에요 🌫');
    } else {
      return [{ ...user, skills: await this.getUserSkills(id) }];
    }
  }
}
