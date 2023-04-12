import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateDto } from './dto/board-create-dto';
import { Request as ExpressRequest } from 'express';
import { ColumnCreateDto } from 'src/column/dto/column-create.dto';
import { ColumnService } from 'src/column/column.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { TaskService } from 'src/task/task.service';
import { MoveTaskDto } from 'src/task/dto/move-task.dto';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly columnService: ColumnService,
    private readonly taskService: TaskService,
  ) {}
  @UseGuards(AuthGuard)
  @Post('/create')
  async createBoard(
    @Body() boardCreateDto: BoardCreateDto,
    @Request() req: ExpressRequest,
  ) {
    const userId = req.userObject?.id;
    return await this.boardService.createBoard(boardCreateDto, userId);
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
    @Request() req: ExpressRequest,
  ) {
    const userId = req.userObject?.id;
    return this.boardService.getUserBoard(boardId, userId);
  }

  @Get('/:boardId/column/:columnId')
  async getUserBoardColumn(
    @Param('boardId') boardId: number,
    @Param('columnId') columnId: number,
    @Request() req: ExpressRequest,
  ) {
    const userId = req.userObject?.id;
    this.boardService.getUserBoard(boardId, userId);
    return await this.taskService.getTasksByColumnId(columnId);
  }

  @Post('/task/move')
  async moveUserTask(
    @Param('boardId') boardId: number,
    @Body() moveTaskDto: MoveTaskDto,
    @Request() req: ExpressRequest,
  ) {
    const userId = req.userObject?.id;
    this.boardService.getUserBoard(boardId, userId);
    return await this.taskService.moveTask(
      moveTaskDto.taskId,
      moveTaskDto.insertIndex,
    );
  }
}
