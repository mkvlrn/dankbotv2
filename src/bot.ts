import { Bot } from '#types/Bot';
import { ping } from '#commands/ping';
import { hue } from '#commands/hue';
import { ready } from '#events/ready';
import { interaction } from '#events/interaction';

const bot = new Bot();
bot.setEvents(ready, interaction);
bot.setCommands(ping, hue);

export { bot };
