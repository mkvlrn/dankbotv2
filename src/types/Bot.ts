import { REST } from '@discordjs/rest';
import { Logger } from '#utils/Logger';
import { Routes } from 'discord-api-types/v10';
import { Client, Collection, Intents } from 'discord.js';

import { Command } from './Command';
import { Event } from './Event';

export class Bot extends Client {
  public logger = Logger.getInstance();

  public commands: Collection<string, Command<any>>;

  constructor(commands: Command<any>[], events: Event[]) {
    super({ intents: [Intents.FLAGS.GUILDS] });

    this.commands = new Collection();
    commands.forEach((command) => {
      this.commands.set(command.data.name!, command);
    });

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
      this.logger.info('bot commands registered!');
    } catch (error) {
      const err = error as Error;
      this.logger.error(err.message);
    }
  }
}
