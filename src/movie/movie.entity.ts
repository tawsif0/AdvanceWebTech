import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';




@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  title: string;

  @Column()
  description: string;

 
  
  
}
