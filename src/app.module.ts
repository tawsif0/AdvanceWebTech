import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import{tmodule} from './ticket/t.module';
import { Ticket } from './ticket/ticket.entity';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/movie.entity';
import { UserModule } from './user/user.module';
import { User} from './user/user.entity';

import { AuthModule } from './user/auth.module';
import * as session from 'express-session';
import { TicketController } from './ticket/ticket.controller';
import { TicketService } from './ticket/ticket.service';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';

import{sup} from './Supporter/sup.entity';
import{supModule} from './Supporter/sup.module';
import { supService } from './Supporter/sup.service';
import { MssgController } from './User/msg.controller';
import { MssgService } from './User/mssg.service';
import { MssgModule } from './User/mssg.module';
import { Mssg } from './User/mssg.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './Supporter/mailer.service';
@Module({
  imports: [tmodule,MovieModule,UserModule,supModule,MssgModule,MailerModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0155',
    database: 'eticket',
    autoLoadEntities: true,
    synchronize: true,
    
  }),
  
  TypeOrmModule.forFeature([User,Ticket,Movie,sup,Mssg]),
  AuthModule,
],
  controllers: [AppController,TicketController,MovieController,MssgController],
  providers: [AppService,TicketService,MovieService,supService,MssgService,MailerService],
})
export class AppModule {}

