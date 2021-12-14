import './polyfills';
async function bootstrap() {

  const app = require('./app').default;

  return app;
}

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
});

module.exports = bootstrap();