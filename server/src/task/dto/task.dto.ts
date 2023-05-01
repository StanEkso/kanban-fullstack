import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ type: Number })
  readonly id: number;

  @ApiProperty({ type: String })
  readonly title: string;

  @ApiProperty({ type: String, default: '' })
  readonly description: string;

  @ApiProperty({ type: Number })
  readonly order: number;
}
