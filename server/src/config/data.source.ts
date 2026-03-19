import { DataSource } from 'typeorm';
import { WaitlistEntry } from '../modules/waitlist/waitlist.entity';
import { env } from './env';


console.log('Entity import check:', WaitlistEntry);

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [WaitlistEntry],
  migrations: ['src/migrations/*.ts'],
  synchronize: env.NODE_ENV === 'development',
  logging: env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});
