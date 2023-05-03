import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { ColumnModule } from 'src/column/column.module';
import { BoardModule } from 'src/board/board.module';

@Module({
  providers: [TaskService],
  imports: [
    TypeOrmModule.forFeature([Task]),
    ColumnModule,
    forwardRef(() => BoardModule),
  ],
  exports: [TaskService],
})
export class TaskModule {}
