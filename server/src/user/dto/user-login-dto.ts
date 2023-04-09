import { IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsString({ message: 'Username should be a string' })
  readonly username: string;
  @IsString()
  @Length(8, 24, {
    message: 'Password length should be greater than 8 and lower than 24',
  })
  readonly password: string;
}
