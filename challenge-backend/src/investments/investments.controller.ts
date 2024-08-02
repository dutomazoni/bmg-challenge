import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { Investment } from './investment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('investment')
export class InvestmentsController {
  constructor(private investmentsService: InvestmentsService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async find(@Param() params: any): Promise<Investment[]> {
    return this.investmentsService.findByWallet(params.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() investment: Investment) {
    return this.investmentsService.create(investment);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(@Body() investment: Investment) {
    return this.investmentsService.update(investment);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param() params: any): Promise<string> {
    return this.investmentsService.delete(parseInt(params.id));
  }
}
