import { SlashCommandBuilder } from '@discordjs/builders';

export class Command<T> {
  data: Partial<SlashCommandBuilder>;

  constructor(
    name: string,
    description: string,
    public execute: (interaction: T) => Promise<void>,
  ) {
    this.data = new SlashCommandBuilder().setName(name).setDescription(description);
  }
}
