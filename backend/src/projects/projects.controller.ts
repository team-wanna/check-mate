import { Skill } from 'src/entities/skills.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiResponseDto } from 'src/common/decorators/api-response-dto.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectThumbnailDto } from './dto/project-thumbnail.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('Project')
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: '모든 프로젝트 가져오기' })
  @ApiResponseDto(ProjectThumbnailDto)
  @Get()
  getAllProjects(
    @Query('locations') locations: string[],
    @Query('skills') skills: string[],
  ) {
    return this.projectsService.getAllProjects(locations, skills);
  }

  @ApiOperation({ summary: '프로젝트 생성하기' })
  @ApiResponseDto(ProjectDto)
  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(@CurrentUser() user, @Body() body: CreateProjectDto) {
    return this.projectsService.createProject(user.id, body);
  }

  @ApiOperation({ summary: '프로젝트 조회하기' })
  @ApiResponseDto(ProjectDto)
  @Get(':id')
  getProject(@Param('id', ParseIntPipe) projectId: number) {
    return this.projectsService.getProject(projectId);
  }

  @ApiOperation({ summary: '프로젝트 수정하기' })
  @ApiResponseDto(ProjectDto)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProject(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() body: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(user.id, projectId, body);
  }

  @ApiOperation({ summary: '프로젝트 삭제하기' })
  @ApiOkResponse({ description: '성공' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProject(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectsService.deleteProject(user.id, projectId);
  }

  @ApiOperation({ summary: '프로젝트 스킬 추가하기' })
  @ApiResponseDto(Skill)
  @UseGuards(JwtAuthGuard)
  @Post(':id/skills')
  addUserSkill(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
    @Query('value') value: string,
  ) {
    return this.projectsService.addProjectSkill(user.id, projectId, value);
  }

  @ApiOperation({ summary: '프로젝트 스킬 삭제하기' })
  @ApiResponseDto(Skill)
  @UseGuards(JwtAuthGuard)
  @Delete(':id/skills')
  deleteUserSkill(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
    @Query('value') value: string,
  ) {
    return this.projectsService.deleteProjectSkill(user.id, projectId, value);
  }

  @ApiOperation({ summary: '프로젝트 로고 이미지 변경하기' })
  @ApiResponseDto(ProjectDto)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logoImageFile'))
  @Post(':id/upload')
  uploadLogoImage(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
    @UploadedFile() logoImageFile: Express.Multer.File,
  ) {
    return this.projectsService.uploadLogoImage(
      user.id,
      projectId,
      logoImageFile,
    );
  }

  @ApiOperation({ summary: '프로젝트 로고 이미지 초기화(삭제)하기' })
  @ApiResponseDto(ProjectDto)
  @UseGuards(JwtAuthGuard)
  @Delete(':id/upload')
  initLogoImage(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectsService.initLogoImage(user.id, projectId);
  }
}
