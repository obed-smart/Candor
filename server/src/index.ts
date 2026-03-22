import 'reflect-metadata';
import 'dotenv/config';

import { env } from './config/env';
import app from './server';
import logger from './shared/utils/logger';
import { connectDB } from './config/database';

const startServer = async () => {
  try {
    // connect the db
    await connectDB();

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running on ${env.NODE_ENV} at port ${env.PORT} 🚀`);
    });
  } catch (err) {
    logger.fatal({ err }, '💥 Server startup failed');
    process.exit(1);
  }
};

startServer();
