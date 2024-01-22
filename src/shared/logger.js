import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'silly',
  defaultMeta: { service: 'servicelog-api' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
});

export default logger;
