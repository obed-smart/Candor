import { DataSource } from 'typeorm';
import { WaitlistEntry } from '../modules/waitlist/waitlist.entity';
import { env } from './env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  entities: [WaitlistEntry],
 migrations: ['dist/migrations/*.js'],
  synchronize: env.NODE_ENV === 'development',
  logging: env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});
