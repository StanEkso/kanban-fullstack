import { Body, Controller, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateDto } from './dto/board-create-dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/create')
  async createBoard(@Body() boardCreateDto: BoardCreateDto) {
    return await this.boardService.createBoard(boardCreateDto, 3);
  }
}
