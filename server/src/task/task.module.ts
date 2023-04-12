import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { ColumnModule } from 'src/column/column.module';

@Module({
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task]), ColumnModule],
  exports: [TaskService],
})
export class TaskModule {}
