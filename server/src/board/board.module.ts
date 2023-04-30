import { Module, forwardRef } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { UserModule } from '../user/user.module';
import { ColumnEntity } from '../column/column.entity';
import { ColumnModule } from '../column/column.module';
import { TaskModule } from '../task/task.module';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    TypeOrmModule.forFeature([Board, ColumnEntity]),
    UserModule,
    forwardRef(() => ColumnModule),
    TaskModule,
  ],
  exports: [BoardService],
})
export class BoardModule {}
