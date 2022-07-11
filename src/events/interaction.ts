import { Bot } from '#types/Bot';
import { Event } from '#types/Event';
import { CommandInteraction, SelectMenuInteraction } from 'discord.js';

const interaction = new Event();
interaction.setup('interactionCreate', false);
interaction.execute = async (arg: CommandInteraction | SelectMenuInteraction) => {
  const bot = arg.client as Bot;
  const commandName: string =
    arg.constructor.name === 'CommandInteraction'
      ? (arg as CommandInteraction).commandName
      : (arg as SelectMenuInteraction).customId.split('-')[0];

  const command = bot.commands.get(commandName);

  try {
    await command?.execute(arg);
  } catch (error) {
    const err = error as Error;
    interaction.logger!.error(err.message);
    await arg.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
};

export { interaction };
