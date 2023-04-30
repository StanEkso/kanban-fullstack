import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ type: String })
  @IsString({ message: 'Username should be a string' })
  readonly username: string;
  @ApiProperty({ type: String })
  @IsString()
  @Length(8, 24, {
    message: 'Password length should be greater than 8 and lower than 24',
  })
  readonly password: string;
}
