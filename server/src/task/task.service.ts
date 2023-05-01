import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ColumnService } from 'src/column/column.service';
import { TaskDto } from './dto/task.dto';

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
    return (
      (await this.taskRepository.maximum('order', {
        column: { id: columnId },
      })) ?? 0
    );
  }

  async moveTask(taskId: number, insertIndex: number): Promise<TaskDto> {
    const taskCandidate = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: {
        column: true,
      },
    });
    if (!taskCandidate) {
      throw new BadRequestException('No such task!');
    }
    const { column } = taskCandidate;
    await this.moveAllTasks(column.id, insertIndex);
    await this.taskRepository.update({ id: taskId }, { order: insertIndex });
    return this.toDto(taskCandidate);
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

  public toDto(task: Task): TaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      order: task.order,
    };
  }
}
