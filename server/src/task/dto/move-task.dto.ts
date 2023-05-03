import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class MoveTaskDto {
  @ApiProperty({ type: String })
  @IsNumber({}, { message: 'Task id should be number' })
  readonly taskId: number;

  @ApiProperty({ type: Number })
  @IsNumber({}, { message: 'Insert index should be number' })
  readonly insertIndex: number;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  readonly newColumnId: number;
}
