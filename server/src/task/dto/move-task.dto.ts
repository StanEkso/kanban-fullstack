import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class MoveTaskDto {
  @ApiProperty({ type: String })
  @IsNumber({}, { message: 'Task id should be number' })
  readonly taskId: number;

  @ApiProperty({ type: Number })
  @IsPositive()
  @IsNumber({}, { message: 'Insert index should be number' })
  readonly insertIndex: number;
}
