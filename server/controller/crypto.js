const logger = require('logger');
const authService = require('../service/crypto');

const fetchCryptoStats = async (req, res) => {
  const { coin } = req.query;
  try {
    const data = await authService.fetchCryptoStats(coin);
    res.status(200).json({ data });
  } catch (error) {
    logger.error(`Error while fetching stats for coin: ${coin}`, error);
    res.status(error.code || 500).send('Something went wrong.');
  }
};

const calculateDeviation = async (req, res) => {
  const { coin } = req.query;
  try {
    const deviation = await authService.calculateDeviation(coin);
    res.status(200).json({ deviation });
  } catch (error) {
    logger.error(`Error while calculating deviation for coin: ${coin}`, error);
    res.status(error.code || 500).send('Something went wrong.');
  }
};

module.exports = {
  fetchCryptoStats,
  calculateDeviation,
};
