import rateLimit from 'express-rate-limit';
import logger from '../logger/logger';
import { ApiResponse } from '../utils/ApiResponse';
import AppError from '../utils/apiError';

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  handler: (req, res) => {
    logger.warn({
      message: 'Global rate limit exceeded',

      ip: req.ip,

      method: req.method,

      url: req.originalUrl,

      userAgent: req.headers['user-agent'],
    });
    res
      .status(429)
      .json(
        ApiResponse.error('Too many requests, please try again later.', 429),
      );
  },
});

export const waitlistRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  handler: (req, res, next) => {
    logger.warn({
      message: 'Waitlist rate limit exceeded',

      reqId: req.id,

      ip: req.ip,

      method: req.method,

      url: req.originalUrl,

      userAgent: req.headers['user-agent'],
    });

    next(new AppError('Too many requests, please try again later.', 429));
  },
});
