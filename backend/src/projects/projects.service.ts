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
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
    private readonly awsService: AwsService,
  ) {}

  async getAllProjects() {
    const projects = await this.projectsRepository.find({
      //TODO: 필터링 적용
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

  async createProject(userId, data) {
    const { title, logoImageUrl, intro, description, location } = data;
    const project = await this.projectsRepository.save({
      ownerId: userId,
      title,
      logoImageUrl,
      intro,
      description,
      location,
    });
    return this.getProject(project.id);
  }

  async getProject(projectId) {
    const project = await this.projectsRepository.findOne(projectId, {
      select: [
        'id',
        'ownerId',
        'title',
        'logoImageUrl',
        'intro',
        'description',
        'location',
        'isClosed',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!project) {
      throw new NotFoundException();
    }
    const skills = await this.getProjectSkills(projectId);
    return [{ ...project, skills }];
  }

  async updateProject(userId, projectId, data) {
    const project = await this.getProject(projectId);
    if (userId !== project[0].ownerId) {
      throw new ForbiddenException('작성자만 변경할 수 있습니다.');
    }
    await this.projectsRepository.update(projectId, { ...data });
    return this.getProject(projectId);
  }

  async deleteProject(userId, projectId) {
    const project = await this.getProject(projectId);
    if (userId !== project[0].ownerId) {
      throw new ForbiddenException('작성자만 변경할 수 있습니다.');
    }
    await this.projectsRepository.softDelete(projectId);
  }

  private async getProjectSkills(projectId) {
    const skills = await getConnection()
      .createQueryBuilder()
      .relation(Project, 'skills')
      .of(projectId)
      .loadMany();
    return skills;
  }

  async addProjectSkill(userId, projectId, skillName) {
    const project = await this.getProject(projectId);
    if (userId !== project[0].ownerId) {
      throw new ForbiddenException('작성자만 변경할 수 있습니다.');
    }
    const skill = await this.skillsRepository.findOne({
      where: { name: skillName },
    });
    // 조인 테이블에 추가
    await getConnection()
      .createQueryBuilder()
      .relation(Project, 'skills')
      .of(projectId)
      .add(skill.id);
    return this.getProjectSkills(projectId);
  }

  async deleteProjectSkill(userId, projectId, skillName) {
    const project = await this.getProject(projectId);
    if (userId !== project[0].ownerId) {
      throw new ForbiddenException('작성자만 변경할 수 있습니다.');
    }
    const skill = await this.skillsRepository.findOne({
      where: { name: skillName },
    });
    // 조인 테이블에서 삭제
    await getConnection()
      .createQueryBuilder()
      .relation(Project, 'skills')
      .of(projectId)
      .remove(skill.id);
    return this.getProjectSkills(projectId);
  }

  private async deleteBeforeLogoImage(logoImageUrl) {
    if (logoImageUrl) {
      const key = logoImageUrl.split(
        `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/`,
      )[1];
      await this.awsService.deleteS3Object(key);
    }
  }

  async uploadLogoImage(userId, projectId, logoImageFile: Express.Multer.File) {
    const project = await this.getProject(projectId);
    if (userId !== project[0].ownerId) {
      throw new ForbiddenException('작성자만 변경할 수 있습니다.');
    }
    await this.deleteBeforeLogoImage(project[0].logoImageUrl);
    const s3Object = await this.awsService.uploadFileToS3(
      'projects',
      logoImageFile,
    );
    const logoImageUrl = this.awsService.getS3FileUrl(s3Object.key);
    await this.projectsRepository.update(projectId, {
      logoImageUrl,
    });
    return this.getProject(projectId);
  }

  async initLogoImage(userId, projectId) {
    const project = await this.getProject(projectId);
    if (userId !== project[0].ownerId) {
      throw new ForbiddenException('작성자만 변경할 수 있습니다.');
    }
    await this.deleteBeforeLogoImage(project[0].logoImageUrl);
    await this.projectsRepository.update(projectId, {
      logoImageUrl: null,
    });
    return this.getProject(projectId);
  }
}
