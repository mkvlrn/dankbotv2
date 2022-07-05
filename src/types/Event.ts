import { Logger } from '#utils/Logger';

export class Event {
  public logger = Logger.getInstance();

  constructor(
    public name: string,
    public once: boolean,
    public execute: (arg: any) => Promise<void>,
  ) {}
}
