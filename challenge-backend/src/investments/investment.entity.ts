import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Wallet } from '../wallets/wallet.entity';

@Entity({ name: 'investments' })
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.id, {
    onDelete: 'CASCADE',
  })
  wallet: Wallet;

  @Column({ default: 0 })
  amount: number;

  @Column({ name: 'created_at', default: new Date() })
  createdAt?: Date = new Date();
}
