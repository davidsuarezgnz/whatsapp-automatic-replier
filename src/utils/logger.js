// src/utils/logger.js
const pino = require('pino');

// Configuración de transporte para pino-pretty usando require.resolve
const transport = pino.transport({
  target: require.resolve('pino-pretty'),
  options: {
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname'
  }
});

// Instancia de logger
const logger = pino({ level: process.env.LOG_LEVEL || 'info' }, transport);

module.exports = { logger };