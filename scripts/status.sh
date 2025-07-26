#!/bin/bash

# Script para ver el estado del bot
echo "🤖 Estado del Bot de WhatsApp"
echo "================================"

# Verificar bot-status.txt
if [ -f "bot-status.txt" ]; then
    STATUS=$(cat bot-status.txt | tr '[:lower:]' '[:upper:]')
    echo "📄 bot-status.txt: $STATUS"
else
    echo "📄 bot-status.txt: No encontrado"
fi

# Verificar bot-control.json
if [ -f "bot-control.json" ]; then
    echo "📄 bot-control.json: Encontrado"
    if command -v jq &> /dev/null; then
        IS_ACTIVE=$(jq -r '.isActive' bot-control.json 2>/dev/null)
        RESPONSE=$(jq -r '.responseMessage' bot-control.json 2>/dev/null)
        echo "   • Activo: $IS_ACTIVE"
        echo "   • Respuesta: \"$RESPONSE\""
    else
        echo "   • Archivo encontrado (instala jq para ver detalles)"
    fi
else
    echo "📄 bot-control.json: No encontrado"
fi

# Verificar variables de entorno
if [ ! -z "$BOT_ACTIVE" ]; then
    echo "🔧 BOT_ACTIVE: $BOT_ACTIVE"
fi

if [ ! -z "$BOT_RESPONSE_MESSAGE" ]; then
    echo "🔧 BOT_RESPONSE_MESSAGE: $BOT_RESPONSE_MESSAGE"
fi

echo ""
echo "💡 Comandos npm disponibles:"
echo "   npm run start      - Iniciar bot"
echo "   npm run activate   - Activar bot"
echo "   npm run deactivate - Desactivar bot"
echo "   npm run status     - Ver estado"
echo "   npm run logs       - Ver logs"
echo "   npm run dev        - Modo desarrollo" 