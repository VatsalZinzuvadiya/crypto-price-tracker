const cron = require('node-cron');
const moment = require('moment');
const logger = require('../utils/logger');
const { saveCryptoData } = require('../helper/auth');

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
  logger.info('Cron job started: Fetching cryptocurrency data');
  try {
    await saveCryptoData();
    logger.info(`At ${moment().unix()} cron job completed successfully`);
  } catch (error) {
    logger.error('Cron job failed', error);
  }
});

module.exports = { startCryptoJob: () => logger.info('Crypto job initialized') };
