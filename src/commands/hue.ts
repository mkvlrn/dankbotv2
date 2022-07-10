import { CommandInteraction, SelectMenuInteraction } from 'discord.js';
import { container } from 'tsyringe';

import { Command } from '#types/Command';
import { Helper } from './hue/Helper';

const hue = container.resolve(Command);
const helper = container.resolve(Helper);
hue.setup('hue', 'random stuff shamelessly stolen from reddit');
hue.execute = async (arg: CommandInteraction | SelectMenuInteraction) => {
  if (arg.constructor.name === 'CommandInteraction') {
    await helper.commandInteract(arg as CommandInteraction);
  } else if (arg.constructor.name === 'SelectMenuInteraction') {
    await helper.selectMenuInteract(arg as SelectMenuInteraction);
  }
};

export { hue };
