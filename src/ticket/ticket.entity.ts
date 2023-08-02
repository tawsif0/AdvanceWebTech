import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';

import { User } from 'src/User/user.entity';

import{IsNotEmpty} from "class-validator";
@Entity("ticket")
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @Column()
  @IsNotEmpty()
  movieId: number;

}
