const env = process.env.ENVIRONMENT;

function initEnv() {
  if (['production', 'development'].includes(env)) return;
  require('dotenv').config();
}

initEnv();

module.exports = {
  production: false,
  server: {
    port: '4000',
    adminPort: '4001',
  },
  database: {
    url: process.env.MONGO_URL,
  },
  mongodb: {
    crypto: process.env.CRYPTO,
  },
  appVersion: '0.0.1',
};
