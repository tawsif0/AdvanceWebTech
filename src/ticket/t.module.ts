import { Module } from "@nestjs/common";
import{TypeOrmModule} from "@nestjs/typeorm";
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket } from "./ticket.entity";
import { User } from "src/User/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Ticket,User])],
    controllers:[TicketController],
    providers:[TicketService],

})
export class tmodule {}