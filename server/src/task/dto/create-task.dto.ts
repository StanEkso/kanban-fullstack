import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Task title should be string!' })
  readonly title: string;

  @IsOptional()
  @IsString({ message: 'Task description should be string!' })
  readonly description: string;

  @IsNumber({}, { message: 'Column id should be numeric!' })
  readonly columnId: number;
}
