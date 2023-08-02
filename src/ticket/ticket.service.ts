import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './ticket.dto';

@Injectable()
export class TicketService {
  
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    
  ) {}

  create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketRepository.save(createTicketDto);
  }

 
  findAll(): Ticket[] | PromiseLike<Ticket[]> {
    return this.ticketRepository.find();
  }
}
