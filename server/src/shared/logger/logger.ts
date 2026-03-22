import { join } from 'path';
import pino from 'pino';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const transport = isProduction
  ? {
      targets: [
        {
          target: 'pino-roll',
          options: {
            file: join(process.cwd(), 'logs', 'app.log'),
            frequency: 'daily',
            size: '10m',
            dateFormat: 'yyyy.MM.dd',
            mkdir: true,
          },
        },
        {
          target: 'pino-roll',
          level: 'error',
          options: {
            file: join(process.cwd(), 'logs', 'error.log'),
            frequency: 'daily',
            size: '10m',
            dateFormat: 'yyyy.MM.dd',
            mkdir: true,
          },
        },
      ],
    }
  : {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: false,
        translateTime: 'HH:MM:ss Z',
      },
    };

const logger = pino({
  level: isProduction ? 'info' : 'debug',

  base: {
    service: 'CANDOR_API',
    env: nodeEnv,
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  transport,

  serializers: {
    err: isProduction
      ? (err) => ({
          type: err.name,
          message: err.message,
          statusCode: err.statusCode,
        })
      : pino.stdSerializers.err,
  },
});

export default logger;
