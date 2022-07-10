import { singleton } from 'tsyringe';
import winston, { createLogger, Logger as WinstonLogger } from 'winston';

@singleton()
export class Logger {
  private instance: WinstonLogger;

  constructor() {
    this.instance = createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.cli(),
        }),
      ],
    });
  }

  info(msg: string) {
    this.instance.info(msg);
  }

  debug(msg: string) {
    this.instance.debug(msg);
  }

  warn(msg: string) {
    this.instance.warn(msg);
  }

  error(msg: string) {
    this.instance.error(msg);
  }
}
