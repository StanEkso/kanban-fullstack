import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class MoveColumnDto {
  @ApiProperty({ type: String })
  @IsNumber({}, { message: 'Board id should be number' })
  readonly boardId: number;

  @ApiProperty({ type: Number })
  @IsNumber({}, { message: 'Insert index should be number' })
  readonly insertIndex: number;
}
