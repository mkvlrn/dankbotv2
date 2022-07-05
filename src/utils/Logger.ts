import winston, { createLogger, Logger as WinstonLogger } from 'winston';

export class Logger {
  private static instance: WinstonLogger;

  private constructor() {
    //
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = createLogger({
        transports: [
          new winston.transports.Console({
            format: winston.format.cli(),
          }),
        ],
      });
    }

    return this.instance;
  }
}
