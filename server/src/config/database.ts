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

  console.log(
  'Raw entities:',
  AppDataSource.options.entities
);

  while (retries > 0) {
    try {
      logger.info(`🔌 DB connection attempt ${attempt}...`);

      if (!AppDataSource.initialize()) {
        await AppDataSource.initialize();
      }

      logger.info('Database Connected successfully');

      const entityName = AppDataSource.entityMetadatas.map((meta) => meta.name);

      logger.debug({ entityName }, 'Loaded entities');

      return;
    } catch (err) {
      retries--;
      attempt++;

      logger.error(`DB connection failed. Retries left: ${retries}`);

      if (retries === 0) {
        logger.fatal(`Database connection failed: ${err}`);
        process.exit(1);
      }

      await retry(3000);
    }
  }
};
