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
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BoardDto } from './dto/board.dto';
import { ColumnDto } from 'src/column/dto/column.dto';
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
  async createColumnTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:boardId')
  async getUserBoard(
    @Param('boardId') boardId: number,
    @User() user: SignedUser,
  ) {
    return this.boardService.getUserBoard(boardId, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:boardId/column/:columnId')
  async getUserBoardColumn(
    @Param('boardId') boardId: number,
    @Param('columnId') columnId: number,
    @User() user: SignedUser,
  ) {
    await this.boardService.getUserBoard(boardId, user.id);
    return await this.taskService.getTasksByColumnId(columnId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:boardId/task/move')
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
