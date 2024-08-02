import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { User } from '../users/user.entity';
import { Investment } from '../investments/investment.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Investment)
    private investmentRepository: Repository<Investment>,
  ) {}

  async create(wallet: Wallet) {
    wallet.user = await this.userRepository.findOneBy({
      email: wallet.user.toString(),
    });
    return this.walletRepository.save(wallet);
  }

  async findById(id: number): Promise<Wallet> {
    return this.walletRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string): Promise<Wallet[]> {
    const user = await this.userRepository.findOneBy({ email: email });
    return this.walletRepository.findBy({ user: user });
  }

  async update(wallet: Wallet) {
    const walletToUpdate = await this.walletRepository.findOneBy({
      id: wallet.id,
    });
    walletToUpdate.name = wallet.name;
    return this.walletRepository.save(walletToUpdate);
  }

  async delete(id: number): Promise<string> {
    const walletToRemove = await this.walletRepository.findOneBy({
      id: id,
    });
    await this.walletRepository.remove(walletToRemove);

    return 'Removed Successfully!';
  }
}
