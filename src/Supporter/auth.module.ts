
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { supService } from './sup.service';
import { sup } from './sup.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';
@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([sup,Movie]),
  ],
  controllers: [AuthController],
  providers: [AuthService, supService, LocalStrategy,MovieService],
})
export class AuthModule {}
