import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiResponseDto } from 'src/common/decorators/api-response-dto.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { multerOptions } from 'src/common/utils/multer.options';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보 가져오기' })
  @ApiResponseDto(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@CurrentUser() user) {
    return user;
  }

  @ApiOperation({ summary: '내 정보 수정하기' })
  @ApiResponseDto(UserDto)
  @UseGuards(JwtAuthGuard)
  @Put('me')
  updateUser(@CurrentUser() user, @Body() body: UserDto) {
    return this.usersService.updateUser(user, body);
  }

  @ApiOperation({ summary: '회원 탈퇴하기' })
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  deleteUser(@CurrentUser() user) {
    return this.usersService.deleteUser(user);
  }

  @ApiOperation({ summary: '프로필 이미지 수정하기' })
  @ApiResponseDto(UserDto)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profileImageFile', multerOptions('users')))
  @Post('me/upload')
  uploadProfileImage(
    @CurrentUser() user,
    @UploadedFile() profileImageFile: Express.Multer.File,
  ) {
    return this.usersService.uploadProfileImage(user, profileImageFile);
  }
}
