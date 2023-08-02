import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from '../ticket/ticket.entity';
import { IsNotEmpty, IsEmail, MinLength } from "class-validator";
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  static filter(arg0: (User: any) => boolean): any {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @Column()
  @MinLength(6)
  password: string;
  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];


}
