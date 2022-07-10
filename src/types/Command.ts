import { SlashCommandBuilder } from '@discordjs/builders';
import { autoInjectable } from 'tsyringe';

import { Logger } from '#utils/Logger';

@autoInjectable()
export class Command {
  public data: Partial<SlashCommandBuilder> = {};

  public execute: (arg: any) => void | Promise<void> = () => {};

  constructor(private logger: Logger) {}

  setup(name: string, description: string) {
    this.data = new SlashCommandBuilder().setName(name).setDescription(description);
  }
}
