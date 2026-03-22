import pino from 'pino';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const logger = pino({
  level: isProduction ? 'info' : 'debug',
  base: {
    service: 'CANDOR_API',
    env: nodeEnv,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(isProduction
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: false,
            translateTime: 'HH:MM:ss Z',
          },
        },
      }),
});

export default logger;
