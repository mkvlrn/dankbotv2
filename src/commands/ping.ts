import { CommandInteraction } from 'discord.js';

import { Command } from '#types/Command';
import { container } from 'tsyringe';

const ping = container.resolve(Command);
ping.setup('ping', 'pings you back');
ping.execute = (arg: CommandInteraction) => {
  arg.reply('pong');
};

export { ping };
