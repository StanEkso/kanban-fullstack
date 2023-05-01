import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/board/board.entity';
import { BoardDto } from 'src/board/dto/board.dto';

export class ColumnDto {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: () => BoardDto })
  board: Board;
}
