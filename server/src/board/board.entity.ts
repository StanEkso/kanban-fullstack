import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  readonly title: string;

  @Column({ nullable: false, default: false })
  readonly isPublic: boolean;

  @Column({ nullable: false, default: '', type: 'text' })
  readonly description: string;

  @ManyToOne(() => User, (u) => u.id)
  owner: User;
}
