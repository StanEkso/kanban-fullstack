import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateDto } from './dto/board-create-dto';
import { Request as ExpressRequest } from 'express';
import { ColumnCreateDto } from 'src/column/dto/column-create.dto';
import { ColumnService } from 'src/column/column.service';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly columnService: ColumnService,
  ) {}

  @Post('/create')
  async createBoard(
    @Body() boardCreateDto: BoardCreateDto,
    @Request() req: ExpressRequest,
  ) {
    const userId = req.userObject?.id ?? 3;
    return await this.boardService.createBoard(boardCreateDto, userId);
  }

  @Post('/create/column')
  async createBoardColumn(@Body() createColumnDto: ColumnCreateDto) {
    return await this.columnService.createColumn(createColumnDto);
  }

  @Get('/:boardId')
  async getUserBoards(@Param('boardId') boardId: number) {
    return this.boardService.getBoardViaId(boardId);
  }
}
