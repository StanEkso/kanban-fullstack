import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateDto } from './dto/board-create-dto';
import { Request as ExpressRequest } from 'express';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/create')
  async createBoard(
    @Body() boardCreateDto: BoardCreateDto,
    @Request() req: ExpressRequest,
  ) {
    const userId = req.userObject?.id ?? 3;
    return await this.boardService.createBoard(boardCreateDto, userId);
  }

  @Get('/:boardId')
  async getUserBoards(@Param('boardId') boardId: number) {
    return this.boardService.getBoardViaId(boardId);
  }
}
