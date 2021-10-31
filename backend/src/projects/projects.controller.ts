import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SkillDto } from 'skills/dto/skill.dto';
import { UpdateSkillDto } from 'skills/dto/update-skill.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiResponseDto } from 'src/common/decorators/api-response-dto.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { multerOptions } from 'src/common/utils/multer.options';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectThumbnailDto } from './dto/project-thumbnail.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: '모든 프로젝트 가져오기' })
  @ApiResponseDto(ProjectThumbnailDto)
  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  @ApiOperation({ summary: '프로젝트 가져오기' })
  @ApiResponseDto(ProjectDto)
  @Get(':id')
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProject(id);
  }

  @ApiOperation({ summary: '프로젝트 생성하기' })
  @ApiResponseDto(ProjectDto)
  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(@CurrentUser() user, @Body() body: CreateProjectDto) {
    return this.projectsService.createProject(user, body);
  }

  @ApiOperation({ summary: '프로젝트 수정하기' })
  @ApiResponseDto(ProjectDto)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProject(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(user, id, body);
  }

  @ApiOperation({ summary: '프로젝트 스킬 가져오기' })
  @ApiResponseDto(SkillDto)
  @Get(':id/skills')
  getProjectSkills(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProjectSkills(id);
  }

  @ApiOperation({ summary: '프로젝트 스킬 추가하기' })
  @ApiResponseDto(SkillDto)
  @UseGuards(JwtAuthGuard)
  @Post(':id/skills')
  addUserSkill(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSkillDto,
  ) {
    return this.projectsService.addProjectSkill(user, id, body);
  }

  @ApiOperation({ summary: '프로젝트 스킬 삭제하기' })
  @ApiResponseDto(SkillDto)
  @UseGuards(JwtAuthGuard)
  @Delete(':id/skills')
  deleteUserSkill(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSkillDto,
  ) {
    return this.projectsService.deleteProjectSkill(user, id, body);
  }

  @ApiOperation({ summary: '프로젝트 삭제하기' })
  @ApiOkResponse({ description: '성공' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProject(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
    return this.projectsService.deleteProject(user, id);
  }

  @ApiOperation({ summary: '프로젝트 로고 이미지 수정하기' })
  @ApiResponseDto(ProjectDto)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('projectLogoImageFile', multerOptions('projects')),
  )
  @Post(':id/upload')
  uploadProjectLogoImage(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() projectLogoImageFile: Express.Multer.File,
  ) {
    return this.projectsService.uploadProjectLogoImage(
      user,
      id,
      projectLogoImageFile,
    );
  }
}
