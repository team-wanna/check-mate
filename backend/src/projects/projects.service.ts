import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from 'src/aws/aws.service';
import { Skill } from 'src/entities/skills.entity';
import { User } from 'src/entities/users.entity';
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

  async getAllProjects(page, size, popular, locations, skills) {
    page = page ? (page <= 0 ? 1 : page) : 1;
    size = size ? (size <= 0 ? 15 : size) : 15;
    const offset = (page - 1) * size;
    const ORDER_BY_OPTION = popular
      ? 'project.applicantCount'
      : 'project.createdAt';
    const projects = await getConnection()
      .createQueryBuilder(Project, 'project')
      .select([
        'project.id',
        'project.title',
        'project.logoImageUrl',
        'project.intro',
        'project.location',
        'project.isClosed',
        'project.createdAt',
        'project.updatedAt',
        'project.applicantCount',
      ])
      .leftJoinAndSelect('project.skills', 'skill')
      .where(
        `TRUE ${locations ? 'AND project.location IN (:locations)' : ''}`,
        { locations },
      )
      .andWhere(`TRUE ${skills ? 'AND skill.value IN (:skills)' : ''}`, {
        skills,
      })
      .take(size)
      .skip(offset)
      .orderBy(ORDER_BY_OPTION, 'DESC')
      .getMany();
    return Promise.all(
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
    // ?????? ???????????? ??????
    await getConnection()
      .createQueryBuilder()
      .relation(Project, 'members')
      .of(project.id)
      .add(userId);
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
      throw new ForbiddenException('???????????? ????????? ??? ????????????.');
    }
    await this.projectsRepository.update(projectId, { ...data });
    return this.getProject(projectId);
  }

  async deleteProject(userId, projectId) {
    const project = await this.getProject(projectId);
    if (userId !== project[0].ownerId) {
      throw new ForbiddenException('???????????? ????????? ??? ????????????.');
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

  async addProjectSkill(userId, projectId, value) {
    const project = await this.getProject(projectId);
    if (userId !== project[0].ownerId) {
      throw new ForbiddenException('???????????? ????????? ??? ????????????.');
    }
    const skill = await this.skillsRepository.findOne({
      where: { value },
    });
    // ?????? ???????????? ??????
    await getConnection()
      .createQueryBuilder()
      .relation(Project, 'skills')
      .of(projectId)
      .add(skill.id);
    return this.getProjectSkills(projectId);
  }

  async deleteProjectSkill(userId, projectId, value) {
    const project = await this.getProject(projectId);
    if (userId !== project[0].ownerId) {
      throw new ForbiddenException('???????????? ????????? ??? ????????????.');
    }
    const skill = await this.skillsRepository.findOne({
      where: { value },
    });
    // ?????? ??????????????? ??????
    await getConnection()
      .createQueryBuilder()
      .relation(Project, 'skills')
      .of(projectId)
      .remove(skill.id);
    return this.getProjectSkills(projectId);
  }

  private async deleteSavedLogoImage(logoImageUrl) {
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
      throw new ForbiddenException('???????????? ????????? ??? ????????????.');
    }
    await this.deleteSavedLogoImage(project[0].logoImageUrl);
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
      throw new ForbiddenException('???????????? ????????? ??? ????????????.');
    }
    await this.deleteSavedLogoImage(project[0].logoImageUrl);
    await this.projectsRepository.update(projectId, {
      logoImageUrl: null,
    });
    return this.getProject(projectId);
  }

  async getStaredProject(userId) {
    const projects = await getConnection()
      .createQueryBuilder()
      .relation(User, 'stars')
      .of(userId)
      .loadMany();
    return projects.map(({ id, title, logoImageUrl }) => {
      return { id, title, logoImageUrl };
    });
  }

  async starsProject(userId, projectId) {
    // ?????? ???????????? ??????
    await getConnection()
      .createQueryBuilder()
      .relation(User, 'stars')
      .of(userId)
      .add(projectId);
    return this.getStaredProject(userId);
  }

  async unstarsProject(userId, projectId) {
    // ?????? ??????????????? ??????
    await getConnection()
      .createQueryBuilder()
      .relation(User, 'stars')
      .of(userId)
      .remove(projectId);
    return this.getStaredProject(userId);
  }

  private async getMembers(projectId) {
    return await getConnection()
      .createQueryBuilder()
      .relation(Project, 'members')
      .of(projectId)
      .loadMany();
  }

  async leaveProject(userId, projectId) {
    // ?????? ??????????????? ??????
    await getConnection()
      .createQueryBuilder()
      .relation(Project, 'members')
      .of(projectId)
      .remove(userId);
    return this.getMembers(projectId);
  }

  async expelMember(userId, projectId, memberId) {
    const project = await this.getProject(projectId);
    if (project[0].ownerId !== userId) {
      throw new ForbiddenException('????????? ????????????.');
    }
    // ?????? ??????????????? ??????
    await getConnection()
      .createQueryBuilder()
      .relation(Project, 'members')
      .of(projectId)
      .remove(memberId);
    return this.getMembers(projectId);
  }
}
