const logger = require('logger');

const health = (req, res) => {
  logger.info('health check');
  res.json({
    health: 'i am working',
  });
};

module.exports = {
  health,
};
