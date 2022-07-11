import { autoInjectable } from 'tsyringe';

import { Logger } from '#utils/Logger';

@autoInjectable()
export class Event {
  public name = '';

  public once = true;

  public execute: (arg: any) => void | Promise<void> = () => {};

  constructor(public logger?: Logger) {}

  setup(name: string, once: boolean) {
    this.name = name;
    this.once = once;
  }
}
