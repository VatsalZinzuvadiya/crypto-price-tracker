const express = require('express');
const { health } = require('../controller/health');

const router = express.Router();

router.get('/', health);

module.exports = router;
