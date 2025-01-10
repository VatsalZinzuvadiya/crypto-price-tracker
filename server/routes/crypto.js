const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {
  fetchCryptoStats,
  calculateDeviation,
} = require('../controller/crypto');
const { cryptoCurrencies } = require('../../constants/enums');

const router = express.Router();

const statsQuery = Joi.object({
  coin: Joi.string()
    .valid(...Object.values(cryptoCurrencies))
    .required(),
}).required();

router.get('/stats', validator.query(statsQuery), fetchCryptoStats);
const deviationQuery = Joi.object({
  coin: Joi.string()
    .valid(...Object.values(cryptoCurrencies))
    .required(),
}).required();

router.get('/deviation', validator.query(deviationQuery), calculateDeviation);

module.exports = router;
