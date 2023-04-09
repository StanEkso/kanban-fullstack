import { Board } from 'src/board/board.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('identity')
  readonly id: number;

  @Column({ nullable: false, unique: true })
  readonly email: string;

  @Column({ nullable: false, unique: true })
  readonly username: string;

  @Column({ nullable: false })
  readonly password: string;

  @OneToMany(() => Board, (b) => b.id)
  readonly ownedBoards: Board[];
}
