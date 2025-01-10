const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {
  fetchCryptoStats,
  calculateDeviation,
} = require('../controller/auth');
const { cryptoCurrencies } = require('../../constants/enums');

const router = express.Router();

const statsQuery = Joi.object({
  coin: Joi.string()
    .valid(...Object.values(cryptoCurrencies))
    .required(),
}).required();

router.post('/stats', validator.query(statsQuery), fetchCryptoStats);
const deviationQuery = Joi.object({
  coin: Joi.string()
    .valid(...Object.values(cryptoCurrencies))
    .required(),
}).required();

router.post('/deviation', validator.query(deviationQuery), calculateDeviation);

module.exports = router;
