#!/bin/bash

# Script de inicio para el bot de WhatsApp
echo "🤖 Iniciando Bot de WhatsApp..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar si el archivo principal existe
if [ ! -f "index.js" ]; then
    echo "❌ Error: No se encontró el archivo index.js"
    exit 1
fi

echo "✅ Todo listo, iniciando bot..."
echo "📱 Escanea el código QR cuando aparezca"
echo "💡 Usa Ctrl+C para detener el bot"
echo ""

# Iniciar el bot
node index.js 