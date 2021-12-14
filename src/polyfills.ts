/* eslint-disable global-require, no-console */
if (process.env.TAF_CONFIG) {
  process.env.NODE_ENV = 'production';
}

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
