// Configuración del bot de WhatsApp con Baileys
module.exports = {
    // ID del grupo donde quieres que funcione el bot (opcional)
    // Si está vacío, funcionará en todos los grupos
    targetGroupId: process.env.TARGET_GROUP_ID || '',
    
    // Estado inicial del bot
    isActive: true,
    
    // Mensaje de respuesta automática
    responseMessage: 'Yo',
    
    // Configuración de Baileys
    baileys: {
        printQRInTerminal: true,
        defaultQueryTimeoutMs: undefined,
        connectTimeoutMs: 60_000,
        keepAliveIntervalMs: 25_000,
        emitOwnEvents: false,
        markOnlineOnConnect: false,
        browser: ['Bot WhatsApp', 'Chrome', '1.0.0'],
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
    // Puedes deshabilitarlos completamente
    commands: {
        enabled: process.env.ENABLE_COMMANDS !== 'false',
        activate: '!on',
        deactivate: '!off'
    },
    
    // Mensajes de respuesta a comandos
    // Personaliza los mensajes que envía el bot
    messages: {
        // Mensaje cuando se activa el bot
        activated: 'Bot ACTIVADO',
        
        // Mensaje cuando se desactiva el bot
        deactivated: 'Bot DESACTIVADO',
        
        // Mensaje de estado (función que recibe parámetros)
        status: (isActive, groupInfo, responseMessage) => 
            `Estado del Bot:\n• Estado: ${isActive ? 'ACTIVADO' : 'DESACTIVADO'}\n• Grupo: ${groupInfo}\n• Respuesta: "${responseMessage}"`,
        
        // Mensaje de ayuda
        help: `Control discreto disponible:\n\n` +
              `• !on - Activar bot discretamente\n` +
              `• !off - Desactivar bot discretamente\n\n` +
              `El bot responde automáticamente "YO" cuando detecta un sticker.`,
        
        // Mensaje para comandos no reconocidos
        unknownCommand: '❓ Comando no reconocido.'
    }
}; 