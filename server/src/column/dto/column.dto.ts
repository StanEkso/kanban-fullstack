import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from 'src/task/dto/task.dto';

export class ColumnDto {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  title: string;
}

export class ColumnExtendedDto extends ColumnDto {
  @ApiProperty({ type: () => [TaskDto] })
  tasks: TaskDto[];
}
