import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { UserCreateDto } from 'src/user/dto/user-create-dto';
import { UserLoginDto } from 'src/user/dto/user-login-dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(userCreateDto: UserCreateDto) {
    const { password, ...rest } = userCreateDto;
    const hashedPassword = await this.encryptService.hashPassword(password);
    const hashedUser: UserCreateDto = {
      ...rest,
      password: hashedPassword,
    };
    return this.userService.createUser(hashedUser);
  }

  async loginUser(userLoginDto: UserLoginDto) {
    const { username, password } = userLoginDto;
    const candidate = await this.userService.getUserByUsername(username);
    if (!candidate) {
      throw new BadRequestException('No user with such data!');
    }
    if (!this.encryptService.isPasswordsEquals(password, candidate.password)) {
      throw new BadRequestException('No user with such data!');
    }
    return {
      accessToken: await this.jwtService.signAsync(
        this.omitPassword(candidate),
      ),
    };
  }

  private omitPassword(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
