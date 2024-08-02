import { Module } from '@nestjs/common';
import { InvestmentsController } from './investments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../wallets/wallet.entity';
import { Investment } from './investment.entity';
import { InvestmentsService } from './investments.service';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Investment, User])],
  providers: [InvestmentsService],
  controllers: [InvestmentsController],
  exports: [InvestmentsService],
})
export class InvestmentsModule {}
