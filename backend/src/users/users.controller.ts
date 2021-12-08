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
import { SkillDto } from 'src/skills/dto/skill.dto';
import { UpdateSkillDto } from 'src/skills/dto/update-skill.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiResponseDto } from 'src/common/decorators/api-response-dto.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AnotherUserDto } from './dto/another-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보 가져오기' })
  @ApiResponseDto(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@CurrentUser() user) {
    return this.usersService.getCurrentUser(user);
  }

  @ApiOperation({ summary: '내 정보 수정하기' })
  @ApiResponseDto(UserDto)
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateUser(@CurrentUser() user, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(user, body);
  }

  @ApiOperation({ summary: '회원 탈퇴하기' })
  @ApiOkResponse({ description: '성공' })
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  deleteUser(@CurrentUser() user) {
    return this.usersService.deleteUser(user);
  }

  @ApiOperation({ summary: '유저 스킬 가져오기' })
  @ApiResponseDto(SkillDto)
  @Get('me/skills')
  getUserSkills(@CurrentUser() user) {
    return this.usersService.getUserSkills(user.id);
  }

  @ApiOperation({ summary: '유저 스킬 추가하기' })
  @ApiResponseDto(SkillDto)
  @UseGuards(JwtAuthGuard)
  @Post('me/skills')
  addUserSkill(@CurrentUser() user, @Body() body: UpdateSkillDto) {
    return this.usersService.addUserSkill(user, body);
  }

  @ApiOperation({ summary: '유저 스킬 삭제하기' })
  @ApiResponseDto(SkillDto)
  @UseGuards(JwtAuthGuard)
  @Delete('me/skills')
  deleteUserSkill(@CurrentUser() user, @Body() body: UpdateSkillDto) {
    return this.usersService.deleteUserSkill(user, body);
  }

  @ApiOperation({ summary: '프로필 이미지 변경하기' })
  @ApiResponseDto(UserDto)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profileImageFile'))
  @Post('me/upload')
  uploadProfileImage(
    @CurrentUser() user,
    @UploadedFile() profileImageFile: Express.Multer.File,
  ) {
    return this.usersService.uploadProfileImage(user, profileImageFile);
  }

  @ApiOperation({ summary: '프로필 이미지 초기화하기' })
  @ApiResponseDto(UserDto)
  @UseGuards(JwtAuthGuard)
  @Delete('me/upload')
  initProfileImage(@CurrentUser() user, @Query('select') select: string) {
    return this.usersService.initProfileImage(user, select);
  }

  @ApiOperation({ summary: '다른 유저 정보 조회하기' })
  @ApiResponseDto(AnotherUserDto)
  @Get(':id')
  getAnotherUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getAnotherUser(id);
  }
}
