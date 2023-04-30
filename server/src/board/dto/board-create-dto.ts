import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class BoardCreateDto {
  @ApiProperty({ type: String })
  @IsString({ message: 'Title should be string' })
  readonly title: string;
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString({ message: 'Title should be string' })
  readonly description: string;
  @ApiProperty({ type: String })
  @IsOptional()
  @IsBoolean({ message: 'Visibility should be a string' })
  readonly isPublic: boolean;
}
