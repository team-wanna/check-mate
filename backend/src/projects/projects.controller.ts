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

  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProject(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(@CurrentUser() user, @Body() body: ProjectDto) {
    return this.projectsService.createProject(user, body);
  }

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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateProject(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProjectDto,
  ) {
    return this.projectsService.updateProject(user, id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProject(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
    return this.projectsService.deleteProject(user, id);
  }
}
