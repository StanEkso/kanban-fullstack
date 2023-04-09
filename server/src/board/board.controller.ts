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

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly columnService: ColumnService,
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
  @UseGuards(AuthGuard)
  @Get('/:boardId')
  async getUserBoard(
    @Param('boardId') boardId: number,
    @Request() req: ExpressRequest,
  ) {
    const userId = req.userObject?.id;
    return this.boardService.getUserBoard(boardId, userId);
  }
}
