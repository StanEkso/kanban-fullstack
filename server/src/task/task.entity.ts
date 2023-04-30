import { ColumnEntity } from '../column/column.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('identity')
  readonly id: number;

  @Column({ nullable: false })
  readonly title: string;

  @Column({ nullable: false, default: '', type: 'text' })
  readonly description: string;

  @ManyToOne(() => ColumnEntity, (c) => c.tasks)
  column: ColumnEntity;

  @Column({ nullable: false })
  readonly order: number;
}
