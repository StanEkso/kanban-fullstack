import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';
import { Repository } from 'typeorm';
import { ColumnCreateDto } from './dto/column-create.dto';
import { BoardService } from 'src/board/board.service';
import { Board } from 'src/board/board.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    private readonly boardService: BoardService,
  ) {}

  async createColumn(columnCreateDto: ColumnCreateDto) {
    const boardCandidate: Board = await this.boardService
      .getBoardViaId(columnCreateDto.boardId)
      .then(
        (board) => board,
        () => {
          throw new BadRequestException('No such board!');
        },
      );
    const column = this.columnRepository.create(columnCreateDto);
    column.board = boardCandidate;
    return this.columnRepository.save(column);
  }
}