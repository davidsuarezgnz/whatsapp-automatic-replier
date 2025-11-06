// src/config/loader.js
const fs = require('fs');
const chokidar = require('chokidar');
require('dotenv').config();

// Configuración por defecto
let config = {
  isActive: true,
  responseMessage: 'Yo',
  targetGroupId: ''
};

// Función para recargar la configuración
function loadConfig() {
  try {
    // 1) bot-control.json
    if (fs.existsSync('bot-control.json')) {
      const data = JSON.parse(fs.readFileSync('bot-control.json', 'utf8'));
      config.isActive = typeof data.isActive === 'boolean' ? data.isActive : config.isActive;
      config.responseMessage = data.responseMessage || config.responseMessage;
      config.targetGroupId = data.targetGroupId || config.targetGroupId;
    }
  } catch (err) {
    console.warn('⚠️ Error leyendo bot-control.json, usando valores anteriores:', err.message);
  }

  // 2) Variables de entorno
  if (process.env.BOT_ACTIVE !== undefined) {
    config.isActive = process.env.BOT_ACTIVE.toLowerCase() === 'true';
  }
  if (process.env.BOT_RESPONSE_MESSAGE) {
    config.responseMessage = process.env.BOT_RESPONSE_MESSAGE;
  }
  if (process.env.TARGET_GROUP_ID) {
    config.targetGroupId = process.env.TARGET_GROUP_ID;
  }

  // 3) bot-status.txt
  try {
    if (fs.existsSync('bot-status.txt')) {
      const status = fs.readFileSync('bot-status.txt', 'utf8').trim().toUpperCase();
      config.isActive = status === 'ACTIVE';
    }
  } catch (err) {
    console.warn('⚠️ Error leyendo bot-status.txt, usando valores anteriores:', err.message);
  }
}

// Carga inicial y vigilar cambios
loadConfig();
chokidar.watch(['bot-control.json', 'bot-status.txt']).on('change', () => {
  console.log('🔄 Configuración cambiada, recargando...');
  loadConfig();
});

module.exports = {
  get isActive() { return config.isActive; },
  get responseMessage() { return config.responseMessage; },
  get targetGroupId() { return config.targetGroupId; }
};