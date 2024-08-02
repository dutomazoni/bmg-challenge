import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { Wallet } from './wallet.entity';
import { User } from '../users/user.entity';
import { Investment } from '../investments/investment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Investment, User])],
  providers: [WalletsService],
  controllers: [WalletsController],
  exports: [WalletsService],
})
export class WalletsModule {}
