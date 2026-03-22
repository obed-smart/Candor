import express from 'express';
import cookieParser from 'cookie-parser';

import GlobalErrorHandler from './shared/middleware/error.handler';
import AppError from './shared/utils/apiError';
import logger from './shared/utils/logger';
import router from './routes';
import { ApiResponse } from './shared/utils/ApiResponse';
import { globalRateLimiter } from './shared/middleware/rate.limiter';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(globalRateLimiter);

app.get('/', (req, res) => {
  res.status(200).json(ApiResponse.success(null, 'Api is running'));
});

app.use('/api/v1', router);

app.use((req, res, next) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(GlobalErrorHandler);

export default app;
