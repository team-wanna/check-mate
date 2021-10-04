import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiResponseDto } from 'src/common/decorators/api-response-dto.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { multerOptions } from 'src/common/utils/multer.options';
import { ProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: '모든 프로젝트 가져오기' })
  @ApiResponseDto(ProjectDto)
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
  createProject(@CurrentUser() user, @Body() body: ProjectDto) {
    return this.projectsService.createProject(user, body);
  }

  @ApiOperation({ summary: '프로젝트 수정하기' })
  @ApiResponseDto(ProjectDto)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateProject(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProjectDto,
  ) {
    return this.projectsService.updateProject(user, id, body);
  }

  @ApiOperation({ summary: '프로젝트 삭제하기' })
  @ApiResponseDto(ProjectDto)
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
