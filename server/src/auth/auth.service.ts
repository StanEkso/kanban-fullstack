import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { UserCreateDto } from 'src/user/dto/user-create-dto';
import { UserLoginDto } from 'src/user/dto/user-login-dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SignedUser } from './decorators/user/user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
  ) {}
  async changePassword(user: SignedUser, changePasswordDto: ChangePasswordDto) {
    const userCandidate = await this.userService.getUserById(user.id);
    if (!userCandidate) {
      throw new BadRequestException('No such user');
    }
    if (
      !(await this.validatePassword(
        userCandidate,
        changePasswordDto.currentPassword,
      ))
    ) {
      throw new ForbiddenException('Not correct credentials!');
    }
    const hashedPassword = await this.encryptService.hashPassword(
      changePasswordDto.newPassword,
    );
    return await this.userService.changeUserPassword(user.id, hashedPassword);
  }
  async createUser(userCreateDto: UserCreateDto) {
    const { password, ...rest } = userCreateDto;
    const hashedPassword = await this.encryptService.hashPassword(password);
    const createdUser = await this.userService.createUser({
      ...rest,
      password: hashedPassword,
    });
    return this.userService.prepareUser(createdUser);
  }

  async loginUser(userLoginDto: UserLoginDto) {
    const { username, password } = userLoginDto;
    const candidate = await this.userService.getUserByUsername(username);
    if (!candidate) {
      throw new BadRequestException('No user with such data!');
    }
    if (
      !(await this.encryptService.isPasswordsEquals(
        password,
        candidate.password,
      ))
    ) {
      throw new BadRequestException('No user with such data!');
    }
    const payload = this.userService.prepareUser(candidate);
    return {
      accessToken: await this.jwtService.signAsync(payload),
      ...payload,
    };
  }
  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (user && (await this.validatePassword(user, password))) {
      return this.userService.prepareUser(user);
    }
    return null;
  }

  private async validatePassword(user: User, password: string) {
    return this.encryptService.isPasswordsEquals(password, user.password);
  }
}
