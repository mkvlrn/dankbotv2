import 'dotenv/config';
// import { argv } from 'process';

import { bot } from './bot';

(async () => {
  // const register = argv.length >= 3 && argv[2] === '--register';

  // await bot.registerCommands();

  bot.login();
})();
