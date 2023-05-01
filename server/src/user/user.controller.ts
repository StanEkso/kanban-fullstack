import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SignedUser, User } from 'src/auth/decorators/user/user.decorator';
import { BoardService } from 'src/board/board.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@User() user: SignedUser) {
    const obj = await this.userService.getUserById(user.id);
    return this.userService.prepareUser(obj);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/boards')
  async getUserBoards(@User() user: SignedUser) {
    return this.boardService.getUserBoards(user.id);
  }
}
