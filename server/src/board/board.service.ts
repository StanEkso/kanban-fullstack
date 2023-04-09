import { BadRequestException, Injectable } from '@nestjs/common';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardCreateDto } from './dto/board-create-dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly userService: UserService,
  ) {}

  async createBoard(boardCreateDto: BoardCreateDto, userId: number) {
    const userCandidate = await this.userService.getUserById(userId);
    if (!userCandidate) {
      throw new BadRequestException('No user with such data!');
    }
    const board = this.boardRepository.create(boardCreateDto);
    board.owner = userCandidate;
    return this.boardRepository.save(board);
  }
}
