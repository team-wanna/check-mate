import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {}

  async getAllProjects() {
    const projects = await this.projectsRepository.find({
      // TO-DO: skills도 포함하여 리턴하도록
      // TO-DO: 필터링 적용
      select: [
        'id',
        'ownerId',
        'logoImageUrl',
        'title',
        'intro',
        'location',
        'isClosed',
        'createdAt',
        'updatedAt',
      ],
      where: { deletedAt: null },
      order: { applicantCount: 'DESC' },
    });

    console.log(projects);

    return projects;
  }

  async getProject(id) {
    const project = await this.projectsRepository.find({
      where: { id, deletedAt: null },
    });

    console.log(project);

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

  async uploadProjectLogoImage(
    user,
    id,
    projectLogoImageFile: Express.Multer.File,
  ) {
    const project = await this.projectsRepository.findOne({
      select: ['ownerId'],
      where: { id, deletedAt: null },
    });

    if (!project) {
      throw new NotFoundException('👻 존재하지 않는 프로젝트에요 🌫');
    } else if (user.id !== project.ownerId) {
      throw new ForbiddenException('👻 프로젝트 등록자만 변경할 수 있어요 🌫');
    } else {
      // TO-DO: 사진 새로 업로드시 기존에 있던 사진은 보관하지 않도록
      // TO-DO: 직접 등록한 로고 이미지를 삭제하여 기본 이미지로 설정하는 기능 추가할지
      const projectLogoImageUrl = `projects/${projectLogoImageFile.filename}`;
      await this.projectsRepository.update(id, {
        logoImageUrl: `http://localhost:${process.env.PORT}/media/${projectLogoImageUrl}`,
      });

      return await this.projectsRepository.find({ where: { id } });
    }
  }
}
