// src/handlers/messages.js
const { isActive, responseMessage, targetGroupId } = require('../config/loader');
const { handleCommands } = require('./commands');
const { logger } = require('../utils/logger');

/**
 * Verifica si un JID corresponde a un grupo
 * @param {string} jid
 * @returns {boolean}
 */
function isGroup(jid) {
  return jid.endsWith('@g.us');
}

/**
 * Maneja mensajes entrantes: comandos y respuesta a stickers
 * @param {{ messages: any[] }} update
 * @param {Object} sock - instancia de Baileys
 * @param {Object} logger
 */
async function handleMessages(update, sock, logger) {
  const msg = update.messages[0];
  if (!msg.message) return;

  const jid = msg.key.remoteJid;
  // Solo grupos y, si se definió, el grupo objetivo
  if (!isGroup(jid) || (targetGroupId && jid !== targetGroupId)) return;

  // 1) Procesar comandos internos (!on, !off)
  const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
  if (text) {
    const processed = await handleCommands(text.toLowerCase(), jid, sock, logger);
    if (processed) return;
  }

  // 2) Responder automáticamente al sticker si el bot está activo
  if (isActive && msg.message.stickerMessage) {
    try {
      // Obtener metadatos del grupo para verificar si tiene mensajes temporales
      const meta = await sock.groupMetadata(jid);
      const expiration = meta.ephemeralDuration || 0;

      // Construir el mensaje efímero si el grupo tiene expiración activa
      const content = expiration > 0
        ? {
            ephemeralMessage: {
              message: { text: responseMessage },
              expiration
            }
          }
        : { text: responseMessage };

      await sock.sendMessage(jid, content);
      logger.info(`✅ Respuesta automática enviada: "${responseMessage}" en ${jid}`);
    } catch (err) {
      logger.error('❌ Error al enviar respuesta automática:', err);
    }
  }
}

module.exports = { handleMessages };
