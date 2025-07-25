// Ejemplo de configuración para el bot de WhatsApp con Baileys
// Copia este archivo como config.js y personaliza según tus necesidades

module.exports = {
    // ID del grupo donde quieres que funcione el bot (opcional)
    // Si está vacío, funcionará en todos los grupos
    // Formato: 123456789@c.us
    targetGroupId: process.env.TARGET_GROUP_ID || '',
    
    // Estado inicial del bot
    // true = activado, false = desactivado
    isActive: true,
    
    // Mensaje de respuesta automática
    // Cambia esto por el mensaje que quieres que envíe
    responseMessage: 'YO',
    
    // Configuración de Baileys
    // No modificar a menos que tengas problemas de compatibilidad
    baileys: {
        printQRInTerminal: true,    // Mostrar QR en terminal
        defaultQueryTimeoutMs: undefined,
        connectTimeoutMs: 60_000,   // Tiempo de conexión
        keepAliveIntervalMs: 25_000, // Mantener conexión viva
        emitOwnEvents: false,       // No emitir eventos propios
        markOnlineOnConnect: false, // No marcar como online
        browser: ['Bot WhatsApp', 'Chrome', '1.0.0'] // Información del navegador
    },
    
    // Configuración de logs
    // Controla qué información se muestra en la consola
    logging: {
        enabled: true,              // Activar/desactivar todos los logs
        showStickerDetection: true, // Mostrar cuando detecta stickers
        showCommands: true,         // Mostrar cuando se ejecutan comandos
        showErrors: true            // Mostrar errores
    },
    
    // Comandos discretos (opcionales)
    // Puedes deshabilitarlos completamente para mayor discreción
    commands: {
        enabled: process.env.ENABLE_COMMANDS !== 'false', // true = habilitados, false = deshabilitados
        activate: '!on',   // Comando para activar
        deactivate: '!off' // Comando para desactivar
    },
    
    // Mensajes de respuesta a comandos
    // Personaliza los mensajes que envía el bot
    messages: {
        // Mensaje cuando se activa el bot
        activated: '✅ Bot ACTIVADO discretamente',
        
        // Mensaje cuando se desactiva el bot
        deactivated: '❌ Bot DESACTIVADO discretamente',
        
        // Mensaje de estado (función que recibe parámetros)
        status: (isActive, groupInfo, responseMessage) => 
            `🤖 Estado del Bot:\n• Estado: ${isActive ? 'ACTIVADO' : 'DESACTIVADO'}\n• Grupo: ${groupInfo}\n• Respuesta: "${responseMessage}"`,
        
        // Mensaje de ayuda
        help: `📋 Control discreto disponible:\n\n` +
              `• !on - Activar bot discretamente\n` +
              `• !off - Desactivar bot discretamente\n\n` +
              `El bot responde automáticamente "YO" cuando detecta un sticker.`,
        
        // Mensaje para comandos no reconocidos
        unknownCommand: '❓ Comando no reconocido.'
    }
}; 