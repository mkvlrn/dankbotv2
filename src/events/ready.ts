import { Client } from 'discord.js';
import { container } from 'tsyringe';

import { Event } from '#types/Event';

const ready = container.resolve(Event);
ready.setup('ready', true);
ready.execute = (arg: Client) => {
  ready.logger.info(`🤖 bot logged in as ${arg.user?.tag} 🤖`);
};

export { ready };
