import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from 'src/aws/aws.service';
import { Skill } from 'src/entities/skills.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { getConnection, Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
    private readonly awsService: AwsService,
    private readonly projectsService: ProjectsService,
  ) {}

  private async getUser(userId) {
    const user = await this.usersRepository.findOne(userId, {
      select: [
        'id',
        'name',
        'profileImageUrl',
        'intro',
        'email',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!user) {
      throw new NotFoundException();
    }
    const skills = await this.getUserSkills(userId);
    const stars = await this.projectsService.getStaredProject(userId);
    return [{ ...user, skills, stars }];
  }

  async getCurrentUser(userId: number) {
    return this.getUser(userId);
  }

  async updateUser(user, body) {
    const { id: userId } = user;
    // 유저 이름 정규 표현식 & 중복 검사
    if (body.name) {
      const regex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/;
      if (regex.test(body.name) || body.name === '') {
        throw new BadRequestException('이름을 올바르게 입력해 주세요.');
      }
      const exist = await this.usersRepository.findOne({
        select: ['id'],
        where: { name: body.name },
      });
      if (exist && exist.id !== userId) {
        throw new ConflictException('이미 사용 중인 이름입니다.');
      }
    }
    // 이메일 중복 검사
    if (body.email) {
      const exist = await this.usersRepository.findOne({
        select: ['id'],
        where: { email: body.email },
      });
      if (exist && exist.id !== userId) {
        throw new ConflictException('이미 사용 중인 이메일입니다.');
      }
    }
    await this.usersRepository.update(userId, {
      ...user,
      ...body,
    });
    return this.getUser(userId);
  }

  async deleteUser(userId) {
    const user = await this.getUser(userId);
    await this.deleteSavedProfileImage(user[0].profileImageUrl);
    await this.usersRepository.softDelete(userId);
    return;
  }

  private async getUserSkills(userId) {
    const skills = await getConnection()
      .createQueryBuilder()
      .relation(User, 'skills')
      .of(userId)
      .loadMany();
    return skills;
  }

  async addUserSkill(userId, value) {
    const skill = await this.skillsRepository.findOne({
      select: ['id'],
      where: { value },
    });
    // 조인 테이블에 추가
    await getConnection()
      .createQueryBuilder()
      .relation(User, 'skills')
      .of(userId)
      .add(skill.id);
    return this.getUserSkills(userId);
  }

  async deleteUserSkill(userId, value) {
    const skill = await this.skillsRepository.findOne({
      select: ['id'],
      where: { value },
    });
    // 조인 테이블에서 삭제
    await getConnection()
      .createQueryBuilder()
      .relation(User, 'skills')
      .of(userId)
      .remove(skill.id);
    return this.getUserSkills(userId);
  }

  private async deleteSavedProfileImage(profileImageUrl) {
    const file = profileImageUrl.split(
      `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/users/`,
    )[1];
    const filename = file.split('.').slice(0, -1).join('.');
    const extname = file.split('.').reverse()[0];
    if (file && isNaN(filename)) {
      await this.awsService.deleteS3Object(`users/${filename}.${extname}`);
    }
  }

  async uploadProfileImage(user, profileImageFile: Express.Multer.File) {
    const { id: userId, profileImageUrl } = user;
    await this.deleteSavedProfileImage(profileImageUrl);
    const s3Object = await this.awsService.uploadFileToS3(
      'users',
      profileImageFile,
    );
    const newProfileImageUrl = this.awsService.getS3FileUrl(s3Object.key);
    await this.usersRepository.update(userId, {
      profileImageUrl: newProfileImageUrl,
    });
    return this.getUser(userId);
  }

  async initProfileImage(user, select) {
    const { id: userId, profileImageUrl } = user;
    const baseURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/users/`;
    if (select > 0 && select < 10) {
      await this.deleteSavedProfileImage(profileImageUrl);
      await this.usersRepository.update(userId, {
        profileImageUrl: `${baseURL}${select}.png`,
      });
    } else {
      await this.usersRepository.update(userId, {
        profileImageUrl: `${baseURL}${Math.floor(Math.random() * 9) + 1}.png`,
      });
    }
    return this.getUser(userId);
  }

  async getAnotherUser(userId) {
    return this.getUser(userId);
  }
}
