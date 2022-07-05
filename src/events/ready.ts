import { Client } from 'discord.js';

import { Event } from '#types/Event';
import { Logger } from '#utils/Logger';

const logger = Logger.getInstance();

async function execute(arg: Client) {
  logger.info(`🤖 bot logged in as ${arg.user?.tag} 🤖`);
}

export const ready = new Event('ready', false, execute);
