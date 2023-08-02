import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mssg } from './mssg.entity';

@Injectable()
export class MssgService {
  
 
  constructor(
    @InjectRepository(Mssg)
    private readonly mssgRepository: Repository<Mssg>,
  ) {}
  create(mssg: Mssg): Promise<Mssg> {
    return this.mssgRepository.save(mssg);
  }

findAll(): Promise<Mssg[]> {
    return this.mssgRepository.find();
  }
}