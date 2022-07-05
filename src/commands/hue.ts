import { CommandInteraction, SelectMenuInteraction } from 'discord.js';

import { Command } from '#types/Command';
import { Helper } from './hue/Helper';

async function execute(interaction: CommandInteraction | SelectMenuInteraction) {
  if (interaction.constructor.name === 'CommandInteraction') {
    await Helper.commandInteract(interaction as CommandInteraction);
  } else if (interaction.constructor.name === 'SelectMenuInteraction') {
    await Helper.selectMenuInteract(interaction as SelectMenuInteraction);
  }
}

export const hue = new Command<CommandInteraction | SelectMenuInteraction>(
  'hue',
  'random stuff shamelessly stolen from reddit',
  execute,
);
