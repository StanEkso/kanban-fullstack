import { IsNumber } from 'class-validator';

export class MoveTaskDto {
  @IsNumber({}, { message: 'Task id should be number' })
  readonly taskId: number;

  @IsNumber({}, { message: 'Insert index should be number' })
  readonly insertIndex: number;
}
