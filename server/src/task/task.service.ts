import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ColumnService } from 'src/column/column.service';
import { TaskDto } from './dto/task.dto';
import { computeIndex } from 'src/utils/indexes';
import { BoardService } from 'src/board/board.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly columnService: ColumnService,
    private readonly boardService: BoardService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { columnId, ...rest } = createTaskDto;
    const columnCandidate = await this.columnService.getColumnById(columnId);
    if (!columnCandidate) {
      throw new BadRequestException('No such column!');
    }
    const lastOrder = await this.getLastOrder(columnId);
    const task = this.taskRepository.create({ ...rest, order: lastOrder + 1 });
    task.column = columnCandidate;
    return await this.taskRepository.save(task);
  }

  async getTasksByColumnId(columnId: number, userId: number) {
    const columnCandidate = await this.columnService.getColumnById(columnId);
    if (!columnCandidate) {
      throw new BadRequestException('No such column!');
    }
    await this.boardService.getUserBoard(columnCandidate.board.id, userId);
    const tasks = await this.taskRepository.find({
      where: {
        column: { id: columnId },
      },
      order: {
        order: 'ASC',
      },
    });
    return tasks.map(this.toDto);
  }

  private async getLastOrder(columnId: number): Promise<number> {
    const tasks = await this.taskRepository.find({
      where: {
        column: { id: columnId },
      },
    });
    return Math.max(...tasks.map((t) => t.order), 0);
  }

  async moveTask(
    taskId: number,
    insertIndex: number,
    userId: number,
    newColumnId?: number,
  ): Promise<TaskDto> {
    const taskCandidate = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: {
        column: true,
      },
    });
    if (!taskCandidate) {
      throw new BadRequestException('No such task!');
    }
    const columnId = newColumnId ?? taskCandidate.column.id;
    if (columnId !== taskCandidate.column.id) {
      await this.taskRepository.update(
        { id: taskCandidate.id },
        {
          column: { id: columnId },
        },
      );
    }
    const tasks = await this.getTasksByColumnId(columnId, userId);
    await this.moveAllTasks(tasks, taskCandidate, insertIndex);
    const updatedTask = await this.taskRepository.findOne({
      where: { id: taskCandidate.id },
    });
    return this.toDto(updatedTask);
  }

  private async moveAllTasks(
    tasks: TaskDto[],
    task: Task,
    insertIndex: number,
  ) {
    const updatedTasks = [...tasks].filter(({ id }) => id !== task.id);
    const resultInsertIndex = computeIndex(
      insertIndex,
      (await this.getLastOrder(task.column.id)) + 1,
    );
    updatedTasks.splice(resultInsertIndex, 0, task);
    for (let i = 0; i < updatedTasks.length; i++) {
      const { id } = updatedTasks[i];
      await this.taskRepository.update({ id }, { order: i + 1 });
    }
  }

  public toDto(task: Task): TaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      order: task.order,
    };
  }
}
