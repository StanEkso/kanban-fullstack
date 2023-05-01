import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.entity';

export class BoardDto {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: Boolean })
  isPublic: boolean;
  @ApiProperty({ type: String })
  description: string;
  @ApiProperty({ type: () => UserDto })
  owner: User;
}
