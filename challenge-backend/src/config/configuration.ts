import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from '../users/user.entity';
import { Wallet } from '../wallets/wallet.entity';
import { Investment } from '../investments/investment.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  ssl: true,
  entities: [User, Wallet, Investment],
};
export const typeOrmConfig = config;
