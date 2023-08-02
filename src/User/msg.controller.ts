import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MssgService } from './mssg.service';

import { Mssg } from './mssg.entity';

@Controller('mssg')
export class MssgController {
  constructor(private readonly mssgService: MssgService) {}
  
  
  
}
