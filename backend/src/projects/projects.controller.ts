import { StaredProjectDto } from './dto/stared-project.dto';
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
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '현재 페이지, 비어있을 경우 기본값 1',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    description: '가져올 프로젝트 카드 정보 개수, 비어있을 경우 기본값 15',
  })
  @ApiQuery({
    name: 'popular',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'locations',
    required: false,
  })
  @ApiQuery({
    name: 'skills',
    required: false,
  })
  @Get()
  getAllProjects(
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('popular') popular?: boolean,
    @Query('locations') locations?: string[],
    @Query('skills') skills?: string[],
  ) {
    return this.projectsService.getAllProjects(
      page,
      size,
      popular,
      locations,
      skills,
    );
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
  addProjectSkill(
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
  deleteProjectSkill(
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

  @ApiOperation({ summary: '프로젝트 즐겨찾기 등록하기' })
  @ApiResponseDto(StaredProjectDto)
  @UseGuards(JwtAuthGuard)
  @Post(':id/stars')
  starsProject(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectsService.starsProject(user.id, projectId);
  }

  @ApiOperation({ summary: '프로젝트 즐겨찾기 해제하기' })
  @ApiResponseDto(StaredProjectDto)
  @UseGuards(JwtAuthGuard)
  @Delete(':id/stars')
  unstarsProject(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectsService.unstarsProject(user.id, projectId);
  }

  @ApiOperation({ summary: '참여중인 프로젝트 탈퇴하기' })
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/members')
  leaveProject(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectsService.leaveProject(user.id, projectId);
  }

  @ApiOperation({ summary: '참여중인 멤버 탈퇴시키기' })
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/members/:memberId')
  expelMember(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) projectId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    return this.projectsService.expelMember(user.id, projectId, memberId);
  }
}
