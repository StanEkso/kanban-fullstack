import { UserDto } from 'src/user/dto/user.dto';

export class UserLoginDataDto extends UserDto {
  accessToken: string;
}
