import { CommandInteraction } from 'discord.js';
import { Command } from '#types/Command';

async function execute(interaction: CommandInteraction) {
  interaction.reply('pong!');
}

export const ping = new Command<CommandInteraction>(
  'ping',
  'Pongs you back with a vengeance',
  execute,
);
