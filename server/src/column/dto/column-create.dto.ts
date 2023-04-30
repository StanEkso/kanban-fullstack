import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ColumnCreateDto {
  @ApiProperty({ type: String })
  @IsString({ message: 'Column title should be string!' })
  readonly title: string;

  @ApiProperty({ type: Number })
  @IsNumber({}, { message: 'Board id should be a number!' })
  readonly boardId: number;
}
