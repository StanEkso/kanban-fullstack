import { IsEmail, IsString, Length } from 'class-validator';
import { Match } from '@/decorators/match.decorator';

export class UserCreateDto {
  @IsEmail({}, { message: 'Email should be a valid email' })
  readonly email: string;
  @IsString({ message: 'Username should be a string' })
  readonly username: string;
  @IsString()
  @Length(8, 24, {
    message: 'Password length should be greater than 8 and lower than 24',
  })
  readonly password: string;

  @IsString()
  @Length(8, 24, {
    message: 'Password length should be greater than 8 and lower than 24',
  })
  @Match(UserCreateDto, (o) => o.password, {
    message: 'Passwords should match!',
  })
  readonly repeatPassword: string;
}
