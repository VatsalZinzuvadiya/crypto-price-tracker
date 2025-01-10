const logger = require('logger');
const { getCryptoPriceRecords, calculateStandardDeviation, getLatestCryptoData } = require('../helper/auth');
const BadRequestError = require('../Exceptions/BadRequestError');

const fetchCryptoStats = async (coin) => {
  try {
    const data = await getLatestCryptoData(coin);
    logger.info(`Successfully fetched latest stats for coin: ${coin}`);
    return data;
  } catch (error) {
    logger.error(`Service error while fetching stats for coin: ${coin}`, error);
    throw error;
  }
};

const calculateDeviation = async (coin) => {
  try {
    const prices = await getCryptoPriceRecords(coin);
    if (prices.length < 2) {
      throw new BadRequestError(`Not enough records to calculate deviation for coin: ${coin}`);
    }
    const deviation = calculateStandardDeviation(prices);
    logger.info(`Standard deviation calculated for coin: ${coin}`);
    return deviation;
  } catch (error) {
    logger.error(`Service error while calculating deviation for coin: ${coin}`, error);
    throw error;
  }
};

module.exports = {
  fetchCryptoStats,
  calculateDeviation,
};
