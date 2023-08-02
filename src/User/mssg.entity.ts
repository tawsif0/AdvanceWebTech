import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import{IsNotEmpty, IsEmail} from "class-validator";
@Entity()
export class Mssg {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  subject:string;

  @Column()
  @IsNotEmpty()
  content:string;

 

 
}
