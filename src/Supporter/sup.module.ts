import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { supService } from './sup.service';
import { sup } from './sup.entity';
import { MssgService } from 'src/User/mssg.service';
import { Mssg } from 'src/User/mssg.entity';
import { AuthService } from './auth.service';
import { MailerService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { TicketService } from 'src/ticket/ticket.service';
import { Ticket } from 'src/ticket/ticket.entity';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { User } from 'src/User/user.entity';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'tausifrahman02@gmail.com',
          pass: 'pixelpvwcavsdayj',
        },
      },
    }),
TypeOrmModule.forFeature([sup,Mssg,Ticket,Movie,User])],
  controllers: [AuthController],
  providers: [supService,AuthService,MssgService,MailerService,TicketService,MovieService,UserService],
})
export class supModule {}
