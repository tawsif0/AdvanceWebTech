import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import{IsNotEmpty, IsEmail,MinLength} from "class-validator";
@Entity()
export class sup {
  static filter(arg0: (sup: any) => boolean): any {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
 public id: number;

  @Column({unique:true})
  @IsNotEmpty()
  username: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
 public email: string;

  @Column()
  @MinLength(6)
  password: string;


}
