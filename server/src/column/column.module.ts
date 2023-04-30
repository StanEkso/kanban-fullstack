import { Module, forwardRef } from '@nestjs/common';
import { ColumnService } from './column.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';
import { Board } from '../board/board.entity';
import { BoardModule } from '../board/board.module';

@Module({
  providers: [ColumnService],
  imports: [
    TypeOrmModule.forFeature([ColumnEntity, Board]),
    forwardRef(() => BoardModule),
  ],
  exports: [ColumnService],
})
export class ColumnModule {}
