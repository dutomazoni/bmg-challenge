import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Wallet } from '../wallets/wallet.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  amountInvested: number;

  @Column({ name: 'created_at', default: new Date() })
  createdAt?: Date = new Date();

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];
}
