import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class BoardCreateDto {
  @IsString({ message: 'Title should be string' })
  readonly title: string;
  @IsOptional()
  @IsString({ message: 'Description should be string' })
  readonly description: string;
  @IsOptional()
  @IsBoolean({ message: 'Visibility should be a string' })
  readonly isPublic: boolean;
}
