require('module-alias/register');
const mongoose = require('mongoose');
const httpContext = require('express-http-context');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('logger');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const config = require('../config');
const router = require('./routes');
const { startCryptoJob } = require('./cron/crypto');

const app = express();

app.use(httpContext.middleware);

app.use((req, res, next) => {
  httpContext.set('requestID', uuidv4());
  next();
});

app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));

mongoose
  .connect(config.database.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error);
    process.exit(1);
  });

app.use(router);

startCryptoJob();

const PORT = process.env.PORT || config.server.port;
app.listen(PORT, () => {
  logger.info(`Server listening on Port ${PORT}`);
});

module.exports = app;
