
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { Ticket } from 'src/ticket/ticket.entity';
import { TicketService } from 'src/ticket/ticket.service';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { MssgService } from './mssg.service';
import { Mssg } from './mssg.entity';
@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User,Ticket,Movie,Mssg]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy,TicketService,MovieService,MssgService],
})
export class AuthModule {}
