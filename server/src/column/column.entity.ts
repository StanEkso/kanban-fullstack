import { Board } from 'src/board/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'columns' })
export class ColumnEntity {
  @PrimaryGeneratedColumn('identity')
  readonly id: number;

  @Column({ nullable: false })
  readonly title: string;

  @ManyToOne(() => Board, (b) => b.columns)
  board: Board;
}
