import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
//register
  async create(username:string,email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = this.usersRepository.create({username, email, password: hashedPassword });
    return this.usersRepository.save(user);
  }
//login
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy( { email } );
  }
async updateUser(email: string, updateUserDto: CreateUserDto ): Promise<User> {
  const user = await this.usersRepository.findOneBy({email});
 
  if (!user) {
    throw new Error('User not found');
  }

  Object.assign(user, updateUserDto);

  return this.usersRepository.save(user);
}
async deleteUser(email: string): Promise<any> {
  await this.usersRepository.delete({email});
}
findAll(): User[] | PromiseLike<User[]> {
  return this.usersRepository.find();
}

}
