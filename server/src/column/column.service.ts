import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';
import { Repository } from 'typeorm';
import { ColumnCreateDto } from './dto/column-create.dto';
import { BoardService } from 'src/board/board.service';
import { Board } from 'src/board/board.entity';
import { ColumnDto } from './dto/column.dto';
import { computeIndex } from 'src/utils/indexes';

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
    column.order = (await this.getLastOrder(boardCandidate.id)) + 1;
    column.board = boardCandidate;
    const savedColumn = await this.columnRepository.save(column);
    return this.toDto(savedColumn);
  }

  async getColumnById(columnId: number) {
    return await this.columnRepository.findOneBy({ id: columnId });
  }

  async getColumnByBoardId(id: number) {
    const columns = await this.columnRepository.find({
      where: { board: { id } },
    });
    return columns.map(this.toDto);
  }

  public toDto({ id, title, order }: ColumnEntity): ColumnDto {
    return { id, title, order };
  }

  private async getLastOrder(boardId: number): Promise<number> {
    return (
      (await this.columnRepository.maximum('order', {
        board: { id: boardId },
      })) ?? 0
    );
  }

  async moveColumn(columnId: number, insertIndex: number): Promise<ColumnDto> {
    const columnCandidate = await this.columnRepository.findOne({
      where: { id: columnId },
      relations: {
        board: true,
      },
    });
    if (!columnCandidate) {
      throw new BadRequestException('No such task!');
    }
    await this.moveAllColumns(columnCandidate, insertIndex);
    const updatedColumn = await this.columnRepository.findOne({
      where: { id: columnCandidate.id },
    });
    return this.toDto(updatedColumn);
  }

  private async moveAllColumns(column: ColumnEntity, insertIndex: number) {
    const tasks = await this.getColumnByBoardId(column.board.id);

    const updatedTasks = [...tasks].filter(({ id }) => id !== column.id);
    const resultInsertIndex = computeIndex(
      insertIndex,
      (await this.getLastOrder(column.board.id)) + 1,
    );
    updatedTasks.splice(resultInsertIndex, 0, column);
    for (let i = 0; i < updatedTasks.length; i++) {
      const { id } = updatedTasks[i];
      await this.columnRepository.update({ id }, { order: i + 1 });
    }
  }
}
