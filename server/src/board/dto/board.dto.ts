import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.entity';
import { BoardAccessType } from '../access/access-type';
import { ColumnDto } from 'src/column/dto/column.dto';

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

export class BoardExtendedDto extends BoardDto {
  @ApiProperty({ enum: BoardAccessType })
  accessType: BoardAccessType;

  @ApiProperty({ type: () => [ColumnDto] })
  columns: ColumnDto[];
}
