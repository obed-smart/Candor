import logger from '../shared/utils/logger';
import { AppDataSource } from './data.source';

// retry the db connect
const retry = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 *  - connect to DB
 * @param retries - number of X the Db will retry after connection fails
 * @returns - (void)
 */

export const connectDB = async (retries = 5): Promise<void> => {
  let attempt = 1;

  while (retries > 0) {
    try {
      logger.info(`🔌 DB connection attempt ${attempt}...`);

      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }

      logger.info('Database Connected successfully');

      const entityMeta = AppDataSource.entityMetadatas.map((meta) => meta.name);

      logger.debug({ entityMeta }, 'Loaded entities');

      return;
    } catch (err) {
      retries--;
      attempt++;

      logger.error(`DB connection failed. Retries left: ${retries}`);

      // 👇 important: destroy bad connection before retry
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
      }

      if (retries === 0) {
        logger.fatal(`Database connection failed: ${err}`);
        process.exit(1);
      }

      await retry(3000);
    }
  }
};
