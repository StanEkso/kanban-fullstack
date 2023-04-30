import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { SignedUser, User } from '@/auth/decorators/user/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@User() user: SignedUser) {
    const obj = await this.userService.getUserById(user.id);
    return this.userService.prepareUser(obj);
  }
}
