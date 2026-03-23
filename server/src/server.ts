import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import GlobalErrorHandler from './shared/middleware/error.handler';
import AppError from './shared/utils/apiError';
import logger from './shared/logger/logger';
import router from './routes';
import { ApiResponse } from './shared/utils/ApiResponse';
import { globalRateLimiter } from './shared/middleware/rate.limiter';

import httpLogger from './shared/middleware/http.logger';

const app = express();

app.use(httpLogger);

app.use(helmet({ contentSecurityPolicy: false }));

app.use(globalRateLimiter);

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.status(200).json(ApiResponse.success(null, 'Api is running'));
});


app.use('/api/v1', router);

app.use((req, res, next) => {
  logger.error(`Can't find ${req.originalUrl} on this server!`);
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(GlobalErrorHandler);

export default app;
