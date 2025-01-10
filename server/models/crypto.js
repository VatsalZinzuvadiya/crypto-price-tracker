const mongoose = require('mongoose');
const { cryptoCurrencies } = require('../../constants/enums');
const { mongodb } = require('../../config');

const cryptoSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
    enum: Object.values(cryptoCurrencies),
    index: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  marketCap: {
    type: Number,
    required: true,
    min: 0,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
}, {
  timestamps: true,
});

cryptoSchema.index({ coin: 1, timestamp: -1 });

module.exports = mongoose.model(mongodb.crypto, cryptoSchema);
