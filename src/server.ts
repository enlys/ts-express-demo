import './polyfills';
import path from 'path';
import { load } from '@up/taf-conf';

async function bootstrap() {

  try {
    await load({
      localFile: path.join(__dirname, './config/config.json'),
      appName: 'tsExpressDemoWebServer',
    });
    require('./app').default;

  } catch (error) {
    console.error('Start server error: ', error);
    setTimeout(() => {
      process.exit(1);
    }, 100);
  }

  // const app = require('./app').default;

  // return app;
}

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
});

module.exports = bootstrap();