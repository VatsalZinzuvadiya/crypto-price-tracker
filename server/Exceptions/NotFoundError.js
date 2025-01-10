const { StatusCodes } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.code = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
