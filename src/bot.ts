import { Bot } from '#types/Bot';

import { ping } from '#commands/ping';
import { hue } from '#commands/hue';
import { ready } from '#events/ready';
import { interaction } from '#events/interaction';

export const bot = new Bot(
  [
    ping,
    hue,
  ],
  [
    ready,
    interaction,
  ],
);
