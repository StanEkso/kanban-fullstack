import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ColumnService } from '@/column/column.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly columnService: ColumnService,
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

  async getTasksByColumnId(columnId: number) {
    const columnCandidate = await this.columnService.getColumnById(columnId);
    if (!columnCandidate) {
      throw new BadRequestException('No such column!');
    }
    return await this.taskRepository.find({
      where: {
        column: { id: columnId },
      },
      order: {
        order: 'ASC',
      },
    });
  }

  private async getLastOrder(columnId: number): Promise<number> {
    return (
      (await this.taskRepository.maximum('order', {
        column: { id: columnId },
      })) ?? 0
    );
  }

  async moveTask(
    taskId: number,
    insertIndex: number,
  ): Promise<Omit<Task, 'column'>> {
    const taskCandidate = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: {
        column: true,
      },
    });
    if (!taskCandidate) {
      throw new BadRequestException('No such task!');
    }
    const { column, ...task } = taskCandidate;
    await this.moveAllTasks(column.id, insertIndex);
    await this.taskRepository.update({ id: taskId }, { order: insertIndex });
    return {
      ...task,
      order: insertIndex,
    };
  }

  private async moveAllTasks(columnId: number, insertIndex: number) {
    const tasks = (await this.getTasksByColumnId(columnId)).filter(
      ({ order }) => order >= insertIndex,
    );
    for (const task of tasks) {
      await this.taskRepository.update(
        { id: task.id },
        { order: task.order + 1 },
      );
    }
  }
}
