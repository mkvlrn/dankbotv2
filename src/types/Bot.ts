import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Client, Collection, Intents } from 'discord.js';
import { autoInjectable, singleton } from 'tsyringe';

import { Logger } from '#utils/Logger';
import { Command } from '#types/Command';
import { Event } from '#types/Event';

@singleton()
@autoInjectable()
export class Bot extends Client {
  public commands: Collection<string, Command> = new Collection();

  public events: Event[] = [];

  constructor(private logger?: Logger) {
    super({ intents: [Intents.FLAGS.GUILDS] });
  }

  public setCommands(...commands: Command[]) {
    commands.forEach((command) => {
      this.commands.set(command.data.name!, command);
    });
  }

  public setEvents(...events: Event[]) {
    events.forEach((event) => {
      if (event.once) {
        this.once(event.name, (args) => event.execute(args));
      } else {
        this.on(event.name, (args) => event.execute(args));
      }
    });
  }

  public async registerCommands() {
    const { DISCORD_TOKEN, APP_ID, SERVER_ID } = process.env;
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN!);
    const body = this.commands.map((command) => command.data.toJSON!());

    try {
      await rest.put(Routes.applicationGuildCommands(APP_ID!, SERVER_ID!), { body });
      this.logger!.info('bot commands registered!');
    } catch (error) {
      const err = error as Error;
      this.logger!.error(err.message);
    }
  }
}
