import { CommandInteraction } from 'discord.js';

import { Command } from '#types/Command';

const ping = new Command();
ping.setup('ping', 'pings you back');
ping.execute = (arg: CommandInteraction) => {
  arg.reply('pong');
};

export { ping };
