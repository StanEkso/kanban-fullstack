import { IsString, Length } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class ChangePasswordDto {
  @IsString()
  readonly currentPassword: string;

  @IsString()
  @Match(ChangePasswordDto, (o) => o.newPassword, {
    message: 'Passwords should match!',
  })
  readonly newPasswordRepeat: string;

  @IsString()
  @Length(8, 24, {
    message:
      'Password length should be greater 8 and less that 24 symbols length',
  })
  readonly newPassword: string;
}
