import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardCreateDto } from './dto/board-create-dto';
import { UserService } from 'src/user/user.service';
import { BoardAccessType } from './access/access-type';

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

  async getUserBoards(userId: number) {
    const userBoards = await this.boardRepository.findBy({
      owner: { id: userId },
    });
    return userBoards;
  }

  async getBoardViaId(id: number) {
    const candidate = await this.boardRepository.findOne({
      where: { id },
      relations: {
        columns: true,
      },
    });
    if (!candidate) {
      throw new BadRequestException('No such board');
    }
    return candidate;
  }

  async getUserBoard(boardId: number, userId: number) {
    const candidate = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: {
        columns: true,
        owner: true,
        members: true,
      },
    });
    if (!candidate) {
      throw new BadRequestException('No such board');
    }
    const accessType = this.getAccessType(candidate, userId);
    if (accessType === BoardAccessType.FORBIDDEN) {
      throw new ForbiddenException("You aren't allowed to check this board!");
    }
    return {
      ...candidate,
      accessType,
    };
  }

  private getAccessType(board: Board, userId: number): BoardAccessType {
    const { owner, ...rest } = board;
    if (owner.id === userId) {
      return BoardAccessType.FULL;
    }

    if (board.members.some(({ id }) => id === userId)) {
      return BoardAccessType.EDIT;
    }
    if (rest.isPublic) {
      return BoardAccessType.VIEW_ONLY;
    }
    return BoardAccessType.FORBIDDEN;
  }
}
