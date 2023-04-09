import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { UserModule } from 'src/user/user.module';
import { ColumnEntity } from 'src/column/column.entity';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [TypeOrmModule.forFeature([Board, ColumnEntity]), UserModule],
})
export class BoardModule {}
