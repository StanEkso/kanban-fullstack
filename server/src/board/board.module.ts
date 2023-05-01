import { Module, forwardRef } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { UserModule } from 'src/user/user.module';
import { ColumnEntity } from 'src/column/column.entity';
import { ColumnModule } from 'src/column/column.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    TypeOrmModule.forFeature([Board, ColumnEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => ColumnModule),
    TaskModule,
  ],
  exports: [BoardService],
})
export class BoardModule {}
