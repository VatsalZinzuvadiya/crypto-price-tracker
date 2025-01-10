const express = require('express');
const { rateLimit } = require('express-rate-limit');
const healthRoute = require('./health');
const cryptoRoute = require('./auth');

const nonAuthRouter = express.Router();

const routerV0 = express.Router();

// Rate-limit
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5 * 60,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.userId || req.ip,
});

// Non-auth routes
nonAuthRouter.use('/health', healthRoute);
nonAuthRouter.use('/', cryptoRoute);

routerV0.use('/v0/api', nonAuthRouter);

routerV0.use(limiter);

module.exports = routerV0;
