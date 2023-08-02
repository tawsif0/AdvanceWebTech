import { Controller, Get, Post, Request, UseGuards ,Body, Delete, Param, Put, HttpException, HttpStatus, Session } from '@nestjs/common';
import { SessionGuard} from '../user/session.guard';
import { AuthService } from './auth.service';
import { supService } from './sup.service';
import { CreatesupDto } from './sup.dto';
import { MssgService } from 'src/User/mssg.service';
import { TicketService } from 'src/ticket/ticket.service';
import { Ticket } from 'src/ticket/ticket.entity';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { User } from 'src/User/user.entity';
import { UserService } from 'src/user/user.service';
@Controller('sup')
export class AuthController {
  constructor(
    private authService: AuthService,
    private supService: supService,
    private mssgservice: MssgService,
    private ticketService: TicketService,
    private movieService: MovieService,
    private userservice:UserService
  ) {}

  @Post('register')
  async register(@Body() body: { username:string ;email: string; password: string }): Promise<{ message: string }> {
    const { username, email, password } = body;
    const existingUser = await this.supService.findByEmail(email);

    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
    }
   
    await this.supService.create(username, email ,  password);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string } ,@Request() req, @Session() session): Promise<any> {
    const { email, password } = body;
   
    const sup = await this.supService.findByEmail(email);

    if (!sup) {
     
      throw new HttpException('Invalid username or password',HttpStatus.NOT_ACCEPTABLE);
    }

     session.email = email;
    return { message: 'Login successful' };
  }


  @Get('profile')
  @UseGuards(SessionGuard)
  
  async getProfile(@Request() req, @Session() session): Promise<any> {
    const  email  = session.email;
    const sup = await this.supService.findOneByEmail(email);
    if(!sup || !(await this.supService.findOneByEmail(email))){
      throw new HttpException('Forbidden resource',HttpStatus.NOT_FOUND);
    }
    else{
      
     
      return { id: sup.id, username: sup.username, email: sup.email };
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
  updatesup(
    @Body() updateUserDto: CreatesupDto,
    @Request() req, @Session() session): Promise<any> | "no session found" {
    if(req.session ==undefined)
    {
      return "no session found";
    }
    else
    {
      let email = session.email;
      return this.supService.updateUser(email, updateUserDto); 
      session.destroy();
    }
    
  }

  @Delete()
  @UseGuards(SessionGuard)
  async deletesup(
    @Request() req,@Session() session): Promise<any> {
    let email = session.email;
    if(req.session ==undefined)
    {
      return "no session found";
    }
    else
    {
      
      return this.supService.deleteUser(email);
      session.destroy();
      
    }
    
  }
  @Get('allmssg')
  @UseGuards(SessionGuard)
  async findAll(@Request() req,@Session() session): Promise<any> {

    let email = session.email;
    if(req.session ==undefined)
    {
      return "no session found";
    }
    else
    {

    return this.mssgservice.findAll();
  }
}

  @Post('sendemail')
  @UseGuards(SessionGuard)
  async sendEmail(@Request() req,@Session() session,
    @Body() emailData: { to: string; subject: string; text: string },
  ): Promise<any> {
    let email = session.email;
    if(req.session ==undefined)
    {
      return "no session found";
    }
    else{
    const { to, subject, text } = emailData;
    await this.supService.sendEmail(to, subject, text);
    } 
  }



  @Get('ticket')
  @UseGuards(SessionGuard)
  async findAllt(@Request() req,@Session() session): Promise<Ticket[]> {
    let email = session.email;
    if(req.session ==undefined)
    {
      throw new Error('Not found');
    }
    else{
    return this.ticketService.findAll();
  }
}
  @Post('Movie')
  @UseGuards(SessionGuard)
  create(@Request() req,@Session() session,@Body() movie: Movie): Promise<Movie>
   {
    let email = session.email;
    if(req.session ==undefined)
    {
      throw new Error('Not found');
    }
    else{
    return this.movieService.create(movie);
  }
}
  @Get('user')
  @UseGuards(SessionGuard)
  async findAllu(@Request() req,@Session() session): Promise<User[]> {
    let email = session.email;
    if(req.session ==undefined)
    {
      throw new Error('Not found');
    }
    else{
    return this.userservice.findAll();
  }
}
}
