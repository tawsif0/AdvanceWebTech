import { Injectable } from '@nestjs/common';
import { supService } from './sup.service';
import { sup } from './sup.entity';

@Injectable()
export class AuthService {
  login(sup: any): any {
      throw new Error('Method not implemented.');
  }
  constructor(private supService: supService) {}

  async validatesup(email: string, password: string): Promise<sup | null> {
    const sup = await this.supService.getUserByEmail(email);
    if (sup && sup.password === password) {
      return sup;
    }
    return null;
  }
}
