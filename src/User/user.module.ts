import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Ticket } from '../ticket/ticket.entity';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { TicketService } from 'src/ticket/ticket.service';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { MssgService } from './mssg.service';
import { Mssg } from './mssg.entity';
@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([User,Ticket,Movie,Mssg])],
  controllers: [AuthController],
  providers: [UserService,AuthService,TicketService,MovieService,MssgService],
})
export class UserModule {}
