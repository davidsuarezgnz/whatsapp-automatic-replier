// src/services/whatsapp.js
const { default: makeWASocket } = require('@whiskeysockets/baileys');

/**
 * Crea y configura una instancia de socket de WhatsApp (Baileys)
 * @param {Object} options
 * @param {boolean} [options.printQR=true] - Mostrar el QR en terminal
 * @returns {import('@whiskeysockets/baileys').Socket}
 */
function initSocket({ printQR = true } = {}) {
  return makeWASocket({
    printQRInTerminal: printQR,
    auth: {
      creds: {},
      keys: {}
    },
    defaultQueryTimeoutMs: undefined
  });
}

module.exports = { initSocket };