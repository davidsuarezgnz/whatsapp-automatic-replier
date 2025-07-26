// src/services/whatsapp.js
const { makeWASocket, DisconnectReason } = require('baileys');
const { Boom } = require('@hapi/boom');

/**
 * Inicializa y devuelve el socket de WhatsApp con Baileys
 * @param {Object} options
 * @param {boolean} [options.printQR=true] - Mostrar QR en terminal
 * @returns {import('baileys').Socket}
 */
function initSocket({ printQR = true } = {}) {
  const sock = makeWASocket({
    auth: { creds: {}, keys: {} },
    printQRInTerminal: printQR,
    defaultQueryTimeoutMs: undefined
  });
  return sock;
}

module.exports = { initSocket };
