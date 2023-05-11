import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create-dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userCreateDto: UserCreateDto) {
    const candidate = await this.userRepository.findOne({
      where: [
        { username: userCreateDto.username },
        { email: userCreateDto.email },
      ],
    });
    if (candidate) {
      throw new BadRequestException('User with such data already exists!');
    }
    const user = this.userRepository.create(userCreateDto);
    return this.userRepository.save(user);
  }

  async changeUserPassword(id: number, newPassword: string) {
    await this.userRepository.update(
      { id },
      {
        password: newPassword,
      },
    );
    const updatedUser = await this.getUserById(id);
    return this.prepareUser(updatedUser);
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  public prepareUser(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
