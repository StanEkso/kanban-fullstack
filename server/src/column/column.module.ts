import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';

@Module({
  providers: [ColumnService],
  imports: [TypeOrmModule.forFeature([ColumnEntity])],
})
export class ColumnModule {}
