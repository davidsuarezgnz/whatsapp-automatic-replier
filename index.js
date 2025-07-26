const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode');
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
    if (!targetGroupId) return true;
    
    // Si TARGET_GROUP_ID contiene múltiples valores separados por coma
    const targetGroups = targetGroupId.split(',').map(id => id.trim());
    return targetGroups.some(groupId => jid === groupId);
}

async function startBot() {
    console.log('🤖 Iniciando Bot de WhatsApp con Baileys...');
    console.log('⏳ Conectando a WhatsApp...');
    
    // Crear directorio para autenticación si no existe
    const authDir = './auth_info_baileys';
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }
    
    // Usar autenticación multi-archivo
    const { state, saveCreds } = await useMultiFileAuthState(authDir);
    
    const sock = makeWASocket({
        auth: state,
        defaultQueryTimeoutMs: undefined,
        connectTimeoutMs: 60_000,
        keepAliveIntervalMs: 25_000,
        emitOwnEvents: false,
        markOnlineOnConnect: false,
        browser: ['Bot WhatsApp', 'Chrome', '1.0.0']
    });

    // Guardar credenciales cuando se actualicen
    sock.ev.on('creds.update', saveCreds);

    // Manejar conexión
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('');
            console.log('📱 ==========================================');
            console.log('📱 ESCANEA ESTE CÓDIGO QR CON WHATSAPP');
            console.log('📱 ==========================================');
            console.log('');
            try {
                const qrCode = await qrcode.toString(qr, { type: 'terminal', small: true });
                console.log(qrCode);
                console.log('');
                console.log('📱 ==========================================');
                console.log('📱 ESCANEA EL CÓDIGO DE ARRIBA');
                console.log('📱 ==========================================');
                console.log('');
            } catch (error) {
                console.log('❌ Error generando QR:', error.message);
                console.log('🔗 Código QR (texto):', qr);
            }
        }
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('🔌 Conexión cerrada debido a:', lastDisconnect?.error, ', reconectando...', shouldReconnect);
            
            if (shouldReconnect) {
                setTimeout(() => startBot(), 3000);
            }
        } else if (connection === 'open') {
            const { isActive, responseMessage } = getBotState();
            console.log('');
            console.log('✅ ==========================================');
            console.log('✅ BOT CONECTADO Y LISTO');
            console.log('✅ ==========================================');
            console.log(`📊 Estado: ${isActive ? 'ACTIVADO' : 'DESACTIVADO'}`);
            console.log(`💬 Respuesta: "${responseMessage}"`);
            console.log(`🎯 Grupo objetivo: ${process.env.TARGET_GROUP_ID || 'Todos los grupos'}`);
            console.log('');
            console.log('🎛️ Control discreto disponible:');
            console.log('• ./activate.sh   - Activar bot');
            console.log('• ./deactivate.sh - Desactivar bot');
            console.log('• ./status.sh     - Ver estado');
            console.log('• ./logs.sh       - Ver logs');
            console.log('');
            console.log('✅ ==========================================');
            console.log('');
        }
    });

    // Manejar mensajes
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const jid = msg.key.remoteJid;
        const tipo = Object.keys(msg.message)[0];

        // Ignorar senderKeyDistributionMessage (son paquetes de cifrado)
        if (tipo === 'senderKeyDistributionMessage') {
            console.log(`   🔐 Ignorando paquete de cifrado`);
            return;
        }

        // Función para detectar stickers en mensajes efímeros
        function isStickerMessage(message) {
            // Sticker directo
            if (message.stickerMessage) return true;
            
            // Sticker dentro de mensaje efímero
            if (message.ephemeralMessage && message.ephemeralMessage.message) {
                return message.ephemeralMessage.message.stickerMessage !== undefined;
            }
            
            return false;
        }

        const isSticker = isStickerMessage(msg.message);

        console.log(`📨 Mensaje recibido:`);
        console.log(`   - Tipo: ${tipo}`);
        console.log(`   - Es sticker: ${isSticker}`);
        console.log(`   - JID: ${jid}`);
        console.log(`   - Es grupo: ${isGroup(jid)}`);
        console.log(`   - Es grupo objetivo: ${isTargetGroup(jid)}`);

        // Solo procesar grupos
        if (!isGroup(jid)) {
            console.log(`   ❌ No es un grupo, ignorando`);
            return;
        }
        
        // Verificar si es el grupo objetivo
        if (!isTargetGroup(jid)) {
            console.log(`   ❌ No es el grupo objetivo, ignorando`);
            return;
        }

        // Obtener estado actual del bot
        const { isActive, responseMessage } = getBotState();
        console.log(`   - Bot activo: ${isActive}`);
        console.log(`   - Respuesta: "${responseMessage}"`);

        // Comandos discretos (solo si están habilitados)
        if (msg.message?.conversation) {
            const texto = msg.message.conversation.toLowerCase();
            console.log(`   - Texto del mensaje: "${texto}"`);
            
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
        if (isSticker && isActive) {
            console.log(`   ✅ Sticker detectado y bot activo, enviando respuesta...`);
            try {
                await sock.sendMessage(jid, { text: responseMessage });
                console.log(`✅ Respuesta automática enviada: "${responseMessage}"`);
                console.log(`👤 Grupo: ${jid}`);
            } catch (error) {
                console.error('❌ Error al enviar respuesta:', error);
            }
        } else if (isSticker && !isActive) {
            console.log(`   ⚠️ Sticker detectado pero bot inactivo`);
        } else {
            console.log(`   ℹ️ Tipo de mensaje: ${tipo} (no es sticker)`);
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