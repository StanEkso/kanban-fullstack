import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/user/dto/user-create-dto';
import { UserLoginDto } from 'src/user/dto/user-login-dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { UserLoginDataDto } from './dto/user-data.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserCreateDto })
  @ApiCreatedResponse({
    type: UserDto,
    description: 'Succesfully create new user',
  })
  @ApiBadRequestResponse({
    description: 'User with such data exists',
  })
  @Post('signup')
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return this.authService.createUser(userCreateDto);
  }

  @ApiCreatedResponse({
    type: UserLoginDataDto,
    description: 'Succesfully logged in account',
  })
  @ApiBadRequestResponse({
    description: 'Incorrect data',
  })
  @Post('signin')
  async loginUser(@Body() userLoginDto: UserLoginDto) {
    return this.authService.loginUser(userLoginDto);
  }
}
