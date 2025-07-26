// src/handlers/connection.js
const { Boom } = require('@hapi/boom');

/**
 * Maneja los updates de conexión.
 * @param {{ connection: string, lastDisconnect?: any }} update
 * @param {Function} startBot - Función para reiniciar el bot en caso necesario
 * @param {Object} logger - Logger con métodos info, warn, error
 */
function handleConnection(update, startBot, logger) {
  const { connection, lastDisconnect } = update;

  if (connection === 'close') {
    const shouldReconnect = !(lastDisconnect?.error instanceof Boom && lastDisconnect.error.output?.statusCode === DisconnectReason.loggedOut);
    logger.warn(`🔌 Conexión cerrada: ${lastDisconnect?.error}. Reconectar? ${shouldReconnect}`);
    if (shouldReconnect) {
      setTimeout(() => {
        logger.info('🔄 Reconectando...');
        startBot();
      }, 3000);
    }
  } else if (connection === 'open') {
    logger.info('✅ Conexión establecida. Bot listo.');
  }
}

module.exports = { handleConnection };