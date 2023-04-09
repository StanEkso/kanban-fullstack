import { IsNumber, IsString } from 'class-validator';

export class ColumnCreateDto {
  @IsString({ message: 'Column title should be string!' })
  readonly title: string;

  @IsNumber({}, { message: 'Board id should be a number!' })
  readonly boardId: number;
}
