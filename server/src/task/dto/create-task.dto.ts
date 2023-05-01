import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ type: String })
  @IsString({ message: 'Task title should be string!' })
  readonly title: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString({ message: 'Task description should be string!' })
  readonly description: string;

  @ApiProperty({ type: Number })
  @IsNumber({}, { message: 'Column id should be numeric!' })
  readonly columnId: number;
}
