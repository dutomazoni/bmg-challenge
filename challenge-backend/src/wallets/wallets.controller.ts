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
import { WalletsService } from './wallets.service';
import { Wallet } from './wallet.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wallet')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @Get('/id/:id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param() params: any): Promise<Wallet> {
    return this.walletsService.findById(params.id);
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  async find(@Param() params: any): Promise<Wallet[]> {
    return this.walletsService.findByEmail(params.email);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() wallet: Wallet) {
    return this.walletsService.create(wallet);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(@Body() wallet: Wallet) {
    return this.walletsService.update(wallet);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param() params: any): Promise<string> {
    return this.walletsService.delete(parseInt(params.id));
  }
}
