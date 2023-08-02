import { Controller, Get, Post,  UseGuards ,Body, Delete, Request,Response, Put, HttpException , HttpStatus, Session,Req,Res, Param} from '@nestjs/common';
import { SessionGuard} from './session.guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { CreateTicketDto } from 'src/ticket/ticket.dto';

import { MovieService } from 'src/movie/movie.service';
import { MssgService } from './mssg.service';
import { Mssg } from './mssg.entity';

@Controller('user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
    private ticketService: TicketService,
    private movieservice: MovieService,
    private mssgService: MssgService
  ) {}

  @Post('register')
  async register(@Body() body: { username:string ;email: string; password: string }): Promise<{ message: string }> {
    const { username, email, password} = body;
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
    }
   
    await this.usersService.create(username, email ,  password);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string } ,@Request() req, @Session() session): Promise<any> {
    const { email, password } = body;
   
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await this.usersService.comparePasswords(password, user.password))) {
     
      throw new HttpException('Invalid username or password',HttpStatus.NOT_ACCEPTABLE);
    }

     session.email = email;
    return { message: 'Login successful' };
  }


  @Get('profile')
  @UseGuards(SessionGuard)
  
  async getProfile(@Request() req, @Session() session): Promise<any> {
    const  email  = session.email;
    const user = await this.usersService.findOneByEmail(email);
    if(!user || !(await this.usersService.findOneByEmail(email))){
      throw new HttpException('Forbidden resource',HttpStatus.NOT_FOUND);
    }
    else{
      
     
      return { id: user.id, username: user.username, email: user.email };
		}
}

 
  @Post('logout')
 
  @UseGuards(SessionGuard)
  logout(@Request() req, @Session() session): string {
    
    if(session.destroy()){
            return "Logged out";
        }else{
            return "Logout Failed";
        }
  }
  
  @Put()
  @UseGuards(SessionGuard)
  updateUser(
    @Body() updateUserDto: CreateUserDto,
    @Request() req, @Session() session): Promise<any> | "no session found" {
    if(req.session ==undefined)
    {
      return "no session found";
    }
    else
    {
      let email = session.email;
      return this.usersService.updateUser(email, updateUserDto); 
      session.destroy();
    }
    
  }

  @Delete()
  @UseGuards(SessionGuard)
  async deleteUser(
    @Request() req,@Session() session): Promise<any> {
    let email = session.email;
    if(req.session ==undefined)
    {
      return "no session found";
    }
    else
    {
      
      return this.usersService.deleteUser(email);
      session.destroy();
      
    }
    
  }
  
  @Post('mssg')
  @UseGuards(SessionGuard)
  async createm(
    @Body() mssg: Mssg, @Request() req,@Session() session): Promise<any> {
      
     
      if(req.session ==undefined)
      {
        return "no session found";
      }
    
        else{
    return this.mssgService.create(mssg);
  }
}


  @Post('ticket')
  @UseGuards(SessionGuard)
 async create (@Body() create:CreateTicketDto,@Request() req,@Session()session): Promise<any> {
  
    if(req.session== undefined)
    {
      return "No Session Found";
    }
    else
    {
      return this.ticketService.create(create)
    }
    
    }
    
  
@Get('movie')
@UseGuards(SessionGuard)
async find(@Request()req,@Session()session): Promise<any> {

  if(req.session== undefined)
  {
    return "Not found session";
  }
  else
  {
  return this.movieservice.findAll();
}
}
}
