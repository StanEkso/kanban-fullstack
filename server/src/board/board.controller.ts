import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateDto } from './dto/board-create-dto';
import { ColumnCreateDto } from '@/column/dto/column-create.dto';
import { ColumnService } from '@/column/column.service';
import { CreateTaskDto } from '@/task/dto/create-task.dto';
import { TaskService } from '@/task/task.service';
import { MoveTaskDto } from '@/task/dto/move-task.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { SignedUser, User } from '@/auth/decorators/user/user.decorator';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly columnService: ColumnService,
    private readonly taskService: TaskService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createBoard(
    @Body() boardCreateDto: BoardCreateDto,
    @User() user: SignedUser,
  ) {
    return await this.boardService.createBoard(boardCreateDto, user.id);
  }

  @Post('/create/column')
  async createBoardColumn(@Body() createColumnDto: ColumnCreateDto) {
    return await this.columnService.createColumn(createColumnDto);
  }
  @Post('/create/task')
  async createColumnTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }
  @Get('/:boardId')
  async getUserBoard(
    @Param('boardId') boardId: number,
    @User() user: SignedUser,
  ) {
    return this.boardService.getUserBoard(boardId, user.id);
  }

  @Get('/:boardId/column/:columnId')
  async getUserBoardColumn(
    @Param('boardId') boardId: number,
    @Param('columnId') columnId: number,
    @User() user: SignedUser,
  ) {
    await this.boardService.getUserBoard(boardId, user.id);
    return await this.taskService.getTasksByColumnId(columnId);
  }

  @Post('/task/move')
  async moveUserTask(
    @Param('boardId') boardId: number,
    @Body() moveTaskDto: MoveTaskDto,
    @User() user: SignedUser,
  ) {
    this.boardService.getUserBoard(boardId, user.id);
    return await this.taskService.moveTask(
      moveTaskDto.taskId,
      moveTaskDto.insertIndex,
    );
  }
}
