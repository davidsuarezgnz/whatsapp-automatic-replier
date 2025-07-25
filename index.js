const { default: makeWASocket, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Función para leer el estado del bot desde archivos externos
function getBotState() {
    let isActive = true;
    let responseMessage = 'YO';
    
    // Opción 1: Leer desde bot-control.json
    try {
        if (fs.existsSync('bot-control.json')) {
            const controlData = JSON.parse(fs.readFileSync('bot-control.json', 'utf8'));
            isActive = controlData.isActive !== undefined ? controlData.isActive : isActive;
            responseMessage = controlData.responseMessage || responseMessage;
        }
    } catch (error) {
        console.log('⚠️ Error leyendo bot-control.json, usando configuración por defecto');
    }
    
    // Opción 2: Leer desde variables de entorno
    if (process.env.BOT_ACTIVE !== undefined) {
        isActive = process.env.BOT_ACTIVE.toLowerCase() === 'true';
    }
    if (process.env.BOT_RESPONSE_MESSAGE) {
        responseMessage = process.env.BOT_RESPONSE_MESSAGE;
    }
    
    // Opción 3: Leer desde bot-status.txt
    try {
        if (fs.existsSync('bot-status.txt')) {
            const status = fs.readFileSync('bot-status.txt', 'utf8').trim().toUpperCase();
            isActive = status === 'ACTIVE';
        }
    } catch (error) {
        console.log('⚠️ Error leyendo bot-status.txt, usando configuración por defecto');
    }
    
    return { isActive, responseMessage };
}

// Función para verificar si es un grupo
function isGroup(jid) {
    return jid.endsWith('@g.us');
}

// Función para verificar si es el grupo objetivo
function isTargetGroup(jid) {
    const targetGroupId = process.env.TARGET_GROUP_ID || '';
    return !targetGroupId || jid === targetGroupId;
}

async function startBot() {
    console.log('🤖 Iniciando Bot de WhatsApp con Baileys...');
    
    const sock = makeWASocket({
        printQRInTerminal: true,
        defaultQueryTimeoutMs: undefined,
        auth: {
            creds: {},
            keys: {}
        }
    });



    // Manejar conexión
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('🔌 Conexión cerrada debido a:', lastDisconnect?.error, ', reconectando...', shouldReconnect);
            
            if (shouldReconnect) {
                setTimeout(() => startBot(), 3000);
            }
        } else if (connection === 'open') {
            const { isActive, responseMessage } = getBotState();
            console.log('✅ Bot conectado y listo!');
            console.log(`📊 Estado: ${isActive ? 'ACTIVADO' : 'DESACTIVADO'}`);
            console.log(`💬 Respuesta: "${responseMessage}"`);
            console.log(`🎯 Grupo objetivo: ${process.env.TARGET_GROUP_ID || 'Todos los grupos'}`);
            console.log('');
            console.log('🎛️ Control discreto disponible:');
            console.log('• Edita bot-control.json para cambiar configuración');
            console.log('• Edita bot-status.txt (ACTIVE/INACTIVE) para activar/desactivar');
            console.log('• Usa variables de entorno BOT_ACTIVE y BOT_RESPONSE_MESSAGE');
            console.log('• El bot se actualiza automáticamente cada 5 segundos');
        }
    });

    // Manejar mensajes
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const jid = msg.key.remoteJid;
        const tipo = Object.keys(msg.message)[0];

        // Solo procesar grupos
        if (!isGroup(jid)) return;
        
        // Verificar si es el grupo objetivo
        if (!isTargetGroup(jid)) return;

        // Obtener estado actual del bot
        const { isActive, responseMessage } = getBotState();

        // Comandos discretos (solo si están habilitados en config)
        if (msg.message?.conversation) {
            const texto = msg.message.conversation.toLowerCase();
            
            // Comandos opcionales (puedes deshabilitarlos editando config.js)
            if (texto === '!on' && process.env.ENABLE_COMMANDS !== 'false') {
                // Actualizar bot-control.json
                const controlData = {
                    isActive: true,
                    responseMessage: responseMessage,
                    targetGroupId: process.env.TARGET_GROUP_ID || ""
                };
                fs.writeFileSync('bot-control.json', JSON.stringify(controlData, null, 2));
                
                await sock.sendMessage(jid, { text: '✅ Bot ACTIVADO discretamente' });
                console.log('🔄 Bot activado por comando en grupo');
                return;
            }
            
            if (texto === '!off' && process.env.ENABLE_COMMANDS !== 'false') {
                // Actualizar bot-control.json
                const controlData = {
                    isActive: false,
                    responseMessage: responseMessage,
                    targetGroupId: process.env.TARGET_GROUP_ID || ""
                };
                fs.writeFileSync('bot-control.json', JSON.stringify(controlData, null, 2));
                
                await sock.sendMessage(jid, { text: '❌ Bot DESACTIVADO discretamente' });
                console.log('🔄 Bot desactivado por comando en grupo');
                return;
            }
        }

        // Si el mensaje es un sticker y el bot está activo
        if (tipo === 'stickerMessage' && isActive) {
            try {
                await sock.sendMessage(jid, { text: responseMessage });
                console.log(`✅ Respuesta automática enviada: "${responseMessage}"`);
                console.log(`👤 Grupo: ${jid}`);
            } catch (error) {
                console.error('❌ Error al enviar respuesta:', error);
            }
        }
    });

    // Manejo de errores
    sock.ev.on('messages.update', (updates) => {
        console.log('📝 Mensaje actualizado:', updates);
    });

    // Manejo de cierre limpio
    process.on('SIGINT', () => {
        console.log('\n🛑 Cerrando bot...');
        sock.end();
        process.exit(0);
    });
}

// Iniciar el bot
startBot().catch(err => {
    console.error('❌ Error al iniciar el bot:', err);
    process.exit(1);
}); 