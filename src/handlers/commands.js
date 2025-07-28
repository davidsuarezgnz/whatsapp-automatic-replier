// src/handlers/commands.js
const fs = require('fs');
const path = require('path');
const { isActive, responseMessage, targetGroupId } = require('../config/loader');

/**
 * Maneja comandos internos del grupo: !on y !off
 * @param {string} conversation - Texto del mensaje en minúsculas
 * @param {string} jid - ID del chat
 * @param {Object} sock - Instancia de Baileys
 * @param {Object} logger - Logger con métodos info, warn, error
 * @returns {Promise<boolean>} - true si el comando fue procesado
 */
async function handleCommands(conversation, jid, sock, logger) {
  const text = conversation.trim();

  if (process.env.ENABLE_COMMANDS === 'false') {
    return false;
  }

  if (text === '!on' || text === '!off') {
    const activate = text === '!on';
    const controlPath = path.resolve('bot-control.json');
    const controlData = {
      isActive: activate,
      responseMessage: responseMessage,
      targetGroupId: targetGroupId
    };

    try {
      fs.writeFileSync(controlPath, JSON.stringify(controlData, null, 2));
      const reply = activate
        ? '✅ Bot ACTIVADO'
        : '❌ Bot DESACTIVADO';
      await sock.sendMessage(jid, { text: reply });
      logger.info(`🔄 Bot ${activate ? 'activado' : 'desactivado'} por comando en ${jid}`);
      return true;
    } catch (err) {
      logger.error('❌ Error al procesar comando:', err);
      return false;
    }
  }

  return false;
}

module.exports = { handleCommands };