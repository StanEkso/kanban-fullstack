import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/user/dto/user-create-dto';
import { UserLoginDto } from 'src/user/dto/user-login-dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserCreateDto })
  @Post('signup')
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return this.authService.createUser(userCreateDto);
  }

  @Post('signin')
  async loginUser(@Body() userLoginDto: UserLoginDto) {
    return this.authService.loginUser(userLoginDto);
  }
}
