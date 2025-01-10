const logger = require('logger');
const moment = require('moment');
const { default: axios } = require('axios');
const model = require('../models');
const NotFoundError = require('../Exceptions/NotFoundError');
const { cryptoCurrencies } = require('../../constants/enums');

const COINS = Object.values(cryptoCurrencies);

const getLatestCryptoData = async (coin) => {
  try {
    const data = await model.Crypto.findOne({ coin })
      .sort({ timestamp: -1 })
      .select('price marketCap change24h')
      .exec();
    if (!data) {
      throw new NotFoundError(`No data found for coin: ${coin}`);
    }
    return data;
  } catch (error) {
    logger.error(`Error in helper while fetching latest data for coin: ${coin}`, error);
    throw error;
  }
};

const getCryptoPriceRecords = async (coin) => {
  try {
    const records = await model.Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100).exec();
    if (!records || records.length === 0) {
      throw new NotFoundError(`No records found for coin: ${coin}`);
    }
    return records.map((record) => record.price);
  } catch (error) {
    logger.error(`Error in helper while fetching price records for coin: ${coin}`, error);
    throw error;
  }
};

const calculateStandardDeviation = (prices) => {
  const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  const variance = prices.reduce((acc, price) => acc + (price - mean) ** 2, 0) / prices.length;
  return Math.sqrt(variance);
};

const fetchCryptoData = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to fetch data from CoinGecko API');
  } catch (error) {
    logger.error('Error fetching data from CoinGecko API', error);
    throw error;
  }
};

const saveCryptoData = async () => {
  try {
    const cryptoData = await fetchCryptoData();

    const bulkOps = Object.keys(cryptoData).map((coin) => {
      const { usd: price, usd_market_cap: marketCap, usd_24h_change: change24h } = cryptoData[coin];

      return {
        insertOne: {
          document: {
            coin,
            price,
            marketCap,
            change24h,
          },
        },
      };
    });
    await model.Crypto.bulkWrite(bulkOps);
    logger.info(`${moment().unix()} Data for multiple coins saved successfully`);
  } catch (error) {
    logger.error('Error saving cryptocurrency data', error);
    throw error;
  }
};

module.exports = {
  getLatestCryptoData,
  getCryptoPriceRecords,
  calculateStandardDeviation,
  saveCryptoData,
};
