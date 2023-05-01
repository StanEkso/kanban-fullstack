import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  username: string;
}
