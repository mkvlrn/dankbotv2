import { container } from 'tsyringe';

import { Bot } from '#types/Bot';
import { ping } from '#commands/ping';
import { hue } from '#commands/hue';
import { ready } from '#events/ready';
import { interaction } from '#events/interaction';

const bot = container.resolve(Bot);
bot.setEvents(ready, interaction);
bot.setCommands(ping, hue);

export { bot };
