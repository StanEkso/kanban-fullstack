import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateDto } from './dto/board-create-dto';
import { ColumnCreateDto } from 'src/column/dto/column-create.dto';
import { ColumnService } from 'src/column/column.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { TaskService } from 'src/task/task.service';
import { MoveTaskDto } from 'src/task/dto/move-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SignedUser, User } from 'src/auth/decorators/user/user.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoardDto, BoardExtendedDto } from './dto/board.dto';
import { ColumnDto } from 'src/column/dto/column.dto';
import { TaskDto } from 'src/task/dto/task.dto';
import { MoveColumnDto } from 'src/column/dto/column-move.dto';
import { Public } from 'src/auth/decorators/public/isPublic.decorator';
@ApiTags('Board')
@Controller('board')
@ApiBearerAuth()
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly columnService: ColumnService,
    private readonly taskService: TaskService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @ApiCreatedResponse({
    type: BoardDto,
    description: 'Successfully created a board',
  })
  async createBoard(
    @Body() boardCreateDto: BoardCreateDto,
    @User() user: SignedUser,
  ) {
    return await this.boardService.createBoard(boardCreateDto, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/create/column')
  @ApiCreatedResponse({
    type: ColumnDto,
    description: 'Successfully created a column',
  })
  async createBoardColumn(@Body() createColumnDto: ColumnCreateDto) {
    return await this.columnService.createColumn(createColumnDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/create/task')
  @ApiCreatedResponse({
    type: TaskDto,
    description: 'Successfully created a task',
  })
  async createColumnTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }
  @Public()
  @UseGuards(JwtAuthGuard)
  @Get('/:boardId')
  @ApiOkResponse({
    type: BoardExtendedDto,
    description: 'Succesfully response',
  })
  @ApiForbiddenResponse({
    description: "You haven't got access",
  })
  async getUserBoard(
    @Param('boardId') boardId: number,
    @User() user: SignedUser,
  ) {
    return this.boardService.getUserBoard(boardId, user?.id);
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Get('/column/:columnId')
  @ApiOkResponse({
    type: [TaskDto],
    description: 'Succesfully response',
  })
  async getUserBoardColumn(
    @Param('columnId') columnId: number,
    @User() user: SignedUser,
  ) {
    return await this.taskService.getTasksByColumnId(columnId, user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/task/move')
  @ApiOkResponse({
    type: TaskDto,
    description: 'Succesfully response',
  })
  async moveUserTask(
    @Body() moveTaskDto: MoveTaskDto,
    @User() user: SignedUser,
  ) {
    return await this.taskService.moveTask(
      moveTaskDto.taskId,
      moveTaskDto.insertIndex,
      user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/column/move')
  @ApiOkResponse({
    type: TaskDto,
    description: 'Succesfully response',
  })
  async moveColumn(
    @Body() moveColumnDto: MoveColumnDto,
    @User() user: SignedUser,
  ) {
    return await this.columnService.moveColumn(
      moveColumnDto.boardId,
      moveColumnDto.insertIndex,
      user.id,
    );
  }
}
