import pinoHttp from 'pino-http';
import { nanoid } from 'nanoid';
import { Request, Response } from 'express';
import logger from '../logger/logger';

const httpLogger = pinoHttp({
  logger,

  customSuccessMessage: function (req: Request, res: Response) {
    return `${req.method} ${req.originalUrl} success`;
  },

  customErrorMessage: function (req: Request, res: Response) {
    return `${req.method} ${req.originalUrl} failed`;
  },

  genReqId: function (req) {
    return req.headers['x-request-id'] || nanoid(10);
  },

  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        userAgent: req.headers['user-agent'],
        ip: req.ip,
      };
    },

    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});

export default httpLogger;
