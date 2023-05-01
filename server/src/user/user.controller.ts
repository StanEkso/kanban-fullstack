import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SignedUser, User } from 'src/auth/decorators/user/user.decorator';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { BoardService } from 'src/board/board.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserDto,
    description: 'The current user (extracted from token)',
  })
  @ApiUnauthorizedResponse({
    description: 'The token is invalid or never exists',
  })
  @Get('me')
  async getUser(@User() user: SignedUser): Promise<UserDto> {
    const obj = await this.userService.getUserById(user.id);
    return this.userService.prepareUser(obj);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/boards')
  async getUserBoards(@User() user: SignedUser) {
    return this.boardService.getUserBoards(user.id);
  }
}
