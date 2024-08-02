import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Investment } from '../investments/investment.entity';

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.email)
  user: User;

  @Column({ default: 0 })
  amount: number;

  @OneToMany(() => Investment, (investment) => investment.wallet, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  investments: Investment[];

  @Column({ name: 'created_at', default: new Date() })
  createdAt?: Date = new Date();
}
