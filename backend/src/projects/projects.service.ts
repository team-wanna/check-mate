import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from 'src/aws/aws.service';
import { Skill } from 'src/entities/skills.entity';
import { getConnection, Repository } from 'typeorm';
import { Project } from '../entities/projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
    @InjectRepository(Skill) private skillsRepository: Repository<Skill>,
    private readonly awsService: AwsService,
  ) {}

  async getAllProjects() {
    const projects = await this.projectsRepository.find({
      // TO-DO: 필터링 적용
      select: [
        'id',
        'title',
        'logoImageUrl',
        'intro',
        'location',
        'isClosed',
        'createdAt',
        'updatedAt',
      ],
      where: { deletedAt: null },
      order: { applicantCount: 'DESC' },
    });

    return await Promise.all(
      projects.map(async (project) => {
        return {
          ...project,
          skills: await this.getProjectSkills(project.id),
        };
      }),
    );
  }

  async getProject(id) {
    const project = await this.projectsRepository.find({
      where: { id, deletedAt: null },
    });

    if (project.length === 0) {
      throw new NotFoundException('👻 존재하지 않는 프로젝트에요 🌫');
    } else {
      return project;
    }
  }

  async createProject(user, data) {
    const { title, logoImageUrl, intro, description, location } = data;

    const newProject = await this.projectsRepository.save({
      ownerId: user.id,
      title,
      logoImageUrl: logoImageUrl || null,
      intro,
      description,
      location,
    });

    return await this.projectsRepository.find({
      where: { id: newProject.id, deletedAt: null },
    });
  }

  async updateProject(user, id, data) {
    const project = await this.projectsRepository.findOne({
      select: ['ownerId'],
      where: { id, deletedAt: null },
    });

    if (!project) {
      throw new NotFoundException('👻 존재하지 않는 프로젝트에요 🌫');
    } else if (user.id !== project.ownerId) {
      throw new ForbiddenException('👻 프로젝트 등록자만 변경할 수 있어요 🌫');
    } else {
      await this.projectsRepository.update(id, { ...data });
      return await this.projectsRepository.find({ where: { id } });
    }
  }

  async getProjectSkills(id) {
    const skills = await getConnection()
      .createQueryBuilder()
      .relation(Project, 'skills')
      .of(id)
      .loadMany();

    return skills;
  }

  async addProjectSkill(user, id, data) {
    const project = await this.projectsRepository.findOne({
      select: ['ownerId'],
      where: { id, deletedAt: null },
    });

    if (!project) {
      throw new NotFoundException('👻 존재하지 않는 프로젝트에요 🌫');
    } else if (user.id !== project.ownerId) {
      throw new ForbiddenException('👻 프로젝트 등록자만 변경할 수 있어요 🌫');
    }

    const { skillName } = data;
    const skill = await this.skillsRepository.findOne({
      where: { name: skillName },
    });
    const skillId = skill.id;

    // 조인 테이블에 추가
    await getConnection()
      .createQueryBuilder()
      .relation(Project, 'skills')
      .of(id)
      .add(skillId);

    return this.getProjectSkills(id);
  }

  async deleteProjectSkill(user, id, data) {
    const project = await this.projectsRepository.findOne({
      select: ['ownerId'],
      where: { id, deletedAt: null },
    });

    if (!project) {
      throw new NotFoundException('👻 존재하지 않는 프로젝트에요 🌫');
    } else if (user.id !== project.ownerId) {
      throw new ForbiddenException('👻 프로젝트 등록자만 변경할 수 있어요 🌫');
    }

    const { skillName } = data;
    const skill = await this.skillsRepository.findOne({
      where: { name: skillName },
    });
    const skillId = skill.id;

    // 조인 테이블에서 삭제
    await getConnection()
      .createQueryBuilder()
      .relation(Project, 'skills')
      .of(id)
      .remove(skillId);

    return this.getProjectSkills(id);
  }

  async deleteProject(user, id) {
    const project = await this.projectsRepository.findOne({
      select: ['ownerId'],
      where: { id, deletedAt: null },
    });

    if (!project) {
      throw new NotFoundException('👻 존재하지 않는 프로젝트에요 🌫');
    } else if (user.id !== project.ownerId) {
      throw new ForbiddenException('👻 프로젝트 등록자만 변경할 수 있어요 🌫');
    } else {
      await this.projectsRepository.softDelete(id);
    }
  }

  async uploadLogoImage(user, id, logoImageFile: Express.Multer.File) {
    const project = await this.projectsRepository.findOne({
      select: ['ownerId', 'logoImageUrl'],
      where: { id, deletedAt: null },
    });
    if (!project) {
      throw new NotFoundException('👻 존재하지 않는 프로젝트에요 🌫');
    } else if (user.id !== project.ownerId) {
      throw new ForbiddenException('👻 프로젝트 등록자만 변경할 수 있어요 🌫');
    } else {
      const key = project.logoImageUrl.split(
        `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/`,
      )[1];
      await this.awsService.deleteS3Object(key);

      const s3Object = await this.awsService.uploadFileToS3(
        'projects',
        logoImageFile,
      );
      const logoImageUrl = this.awsService.getAwsS3FileUrl(s3Object.key);
      await this.projectsRepository.update(id, {
        logoImageUrl,
      });

      return await this.projectsRepository.find({ where: { id } });
    }
  }
}
