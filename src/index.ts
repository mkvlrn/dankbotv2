import 'dotenv/config';
import 'reflect-metadata';
import { argv } from 'process';

import { bot } from './bot';

(async () => {
  const register = argv.length >= 3 && argv[2] === '--register';

  if (register) {
    await bot.registerCommands();
  } else {
    bot.login();
  }
})();
