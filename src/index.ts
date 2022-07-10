import 'reflect-metadata';
import 'dotenv/config';

import { bot } from './bot';

(async () => {
  bot.login();
})();
