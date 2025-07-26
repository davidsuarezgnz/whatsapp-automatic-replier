// src/index.js
const { initSocket } = require('./services/whatsapp');
const { isActive, responseMessage, targetGroupId } = require('./config/loader');
const { handleConnection } = require('./handlers/connection');
const { handleMessages } = require('./handlers/messages');
const { logger } = require('./utils/logger');

async function startBot() {
  logger.info('🤖 Iniciando bot de WhatsApp...');
  // Inicializar socket de WhatsApp
  const sock = initSocket({ printQR: true });

  // Eventos de conexión
  sock.ev.on('connection.update', update => handleConnection(update, startBot, logger));

  // Mensajes entrantes
  sock.ev.on('messages.upsert', m => handleMessages(m, sock, logger));

  // Actualizaciones de mensaje
  sock.ev.on('messages.update', ups => logger.debug('📝 Mensaje actualizado', ups));

  // Cierre limpio al SIGINT
  process.on('SIGINT', () => {
    logger.info('🛑 Cerrando bot...');
    sock.end();
    process.exit(0);
  });
}

// Arrancar bot
startBot().catch(err => {
  logger.error('❌ Error al iniciar el bot:', err);
  process.exit(1);
});