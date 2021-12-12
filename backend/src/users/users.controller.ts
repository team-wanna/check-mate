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
    return this.usersService.deleteUser(user.id);
  }

  @ApiOperation({ summary: '유저 스킬 추가하기' })
  @ApiResponseDto(Skill)
  @UseGuards(JwtAuthGuard)
  @Post('me/skills')
  addUserSkill(@CurrentUser() user, @Query('name') skillName: string) {
    return this.usersService.addUserSkill(user.id, skillName);
  }

  @ApiOperation({ summary: '유저 스킬 삭제하기' })
  @ApiResponseDto(Skill)
  @UseGuards(JwtAuthGuard)
  @Delete('me/skills')
  deleteUserSkill(@CurrentUser() user, @Query('name') name: string) {
    return this.usersService.deleteUserSkill(user.id, name);
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
  @ApiResponseDto(UserDto)
  @Get(':id')
  getAnotherUser(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getAnotherUser(userId);
  }
}
