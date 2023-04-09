import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false, unique: true })
  readonly email: string;

  @Column({ nullable: false, unique: true })
  readonly username: string;

  @Column({ nullable: false })
  readonly password: string;
}
