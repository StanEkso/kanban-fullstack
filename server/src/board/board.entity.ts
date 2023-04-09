import { ColumnEntity } from 'src/column/column.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('identity')
  readonly id: number;

  @Column({ nullable: false })
  readonly title: string;

  @Column({ nullable: false, default: false })
  readonly isPublic: boolean;

  @Column({ nullable: false, default: '', type: 'text' })
  readonly description: string;

  @ManyToOne(() => User, (u) => u.id)
  owner: User;

  @OneToMany(() => ColumnEntity, (c) => c.id)
  columns: ColumnEntity[];
}
