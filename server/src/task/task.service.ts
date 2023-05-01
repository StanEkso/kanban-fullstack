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
    await this.moveAllTasks(taskCandidate, insertIndex);
    const updatedTask = await this.taskRepository.findOne({
      where: { id: taskCandidate.id },
    });
    return this.toDto(updatedTask);
  }

  private async moveAllTasks(task: Task, insertIndex: number) {
    const tasks = await this.getTasksByColumnId(task.column.id);

    const updatedTasks = [...tasks].filter(({ id }) => id !== task.id);
    const resultInsertIndex = Math.min(
      (await this.getLastOrder(task.column.id)) + 1,
      insertIndex,
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
