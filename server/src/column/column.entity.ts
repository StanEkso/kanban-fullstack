import { Board } from '@/board/board.entity';
import { Task } from '@/task/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'columns' })
export class ColumnEntity {
  @PrimaryGeneratedColumn('identity')
  readonly id: number;

  @Column({ nullable: false })
  readonly title: string;

  @ManyToOne(() => Board, (b) => b.columns)
  board: Board;

  @OneToMany(() => Task, (t) => t.column)
  tasks: Task[];
}
