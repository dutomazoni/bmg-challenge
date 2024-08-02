import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../wallets/wallet.entity';
import { Investment } from './investment.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(Investment)
    private investmentRepository: Repository<Investment>,
  ) {}

  async findByWallet(id: number): Promise<Investment[]> {
    const wallet = await this.walletRepository.findOneBy({ id: id });
    return this.investmentRepository.findBy({ wallet: wallet });
  }

  async create(investment: Investment) {
    const wallet = await this.walletRepository.findOneBy({
      id: investment.wallet as any,
    });
    wallet.amount = wallet.amount + investment.amount;
    await this.walletRepository.save(wallet);
    investment.wallet = await this.walletRepository.findOneBy({
      id: wallet.id,
    });
    return this.investmentRepository.save(investment);
  }

  async update(investment: Investment) {
    const wallet = await this.walletRepository.findOneBy({
      id: investment.wallet as any,
    });
    const investToUpdate = await this.investmentRepository.findOneBy({
      id: investment.id,
    });
    wallet.amount = wallet.amount + (investment.amount - investToUpdate.amount);

    await this.walletRepository.save(wallet);
    investToUpdate.wallet = await this.walletRepository.findOneBy({
      id: wallet.id,
    });
    investToUpdate.amount = investment.amount;
    investToUpdate.company = investment.company;
    return this.investmentRepository.save(investToUpdate);
  }

  async delete(id: number): Promise<string> {
    const investToRemove = await this.investmentRepository.findOne({
      where: { id: id },
      relations: ['wallet'],
    });
    const wallet = await this.walletRepository.findOneBy({
      id: investToRemove.wallet.id,
    });
    wallet.amount = wallet.amount - investToRemove.amount;
    await this.investmentRepository.remove(investToRemove);
    await this.walletRepository.save(wallet);
    return 'Removed Successfully!';
  }
}
