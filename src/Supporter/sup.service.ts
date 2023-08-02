
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sup } from './sup.entity';
import { CreatesupDto } from './sup.dto';
import { MailerService } from './mailer.service';


@Injectable()
export class supService {

  constructor(
    @InjectRepository(sup)
   
    private supRepository: Repository<sup>,
    private mailerService: MailerService,
  ) 
  
  {}
  async create(username:string,email: string, password: string): Promise<any> {
  
    const sup = this.supRepository.create({username, email, password});
    return this.supRepository.save(sup);
  }
//login
  async findByEmail(email: string): Promise<sup | undefined> {
    return this.supRepository.findOne({ where: { email } });
  }

  

  async getUserByEmail(email: string): Promise<sup | undefined> {
    return this.supRepository.findOneBy({ email });
  }
  async findOneByEmail(email: string): Promise<sup> {
    return this.supRepository.findOneBy( { email } );
  }
async updateUser(email: string, updateUserDto: CreatesupDto): Promise<sup> {
  const sup = await this.supRepository.findOneBy({email});

  if (!sup) {
    throw new Error('User not found');
  }

  Object.assign(sup, updateUserDto);

  return this.supRepository.save(sup);
}
async deleteUser(email: string): Promise<any> {
  await this.supRepository.delete({email});
}


async sendEmail(to: string, subject: string, text: string): Promise<void> {
  await this.mailerService.sendMail(to, subject, text);
}

}
