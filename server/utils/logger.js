/* eslint-disable no-shadow */
const { format, createLogger, transports } = require('winston');
const httpContext = require('express-http-context');
const config = require('../../config');

const {
  timestamp, combine, printf, errors,
} = format;

const logFormat = printf(({
  level, message, timestamp, stack,
}) => {
  const requestID = httpContext.get('requestID');
  const requestIDPart = requestID ? `[${requestID}] ` : '';
  return `[${timestamp}] ${requestIDPart} [${level}]: [${message}] [${stack || ''}]`;
});

function buildDevLogger() {
  return createLogger({
    format: combine(
      format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat,
    ),
    transports: [new transports.Console()],
  });
}

// const esTransport = new ElasticsearchTransport({
//   client: opensearchClient,
//   index: logConstants.loggingIndex.toLowerCase(),
// });

function buildProdLogger() {
  return createLogger({
    format: combine(
      format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat,
    ),
    // transports: [new transports.Console(), esTransport],
  });
}

module.exports = config.production ? buildProdLogger() : buildDevLogger();
