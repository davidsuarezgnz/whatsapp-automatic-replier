#!/bin/bash

# Script de configuración rápida para el bot de WhatsApp
echo "🤖 Configuración Rápida del Bot de WhatsApp"
echo "=============================================="

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    echo "📝 Creando archivo de configuración..."
    cp env.example .env
    echo "✅ Archivo .env creado. Edítalo para personalizar la configuración."
fi

# Crear archivos de control si no existen
if [ ! -f "bot-control.json" ]; then
    echo "📝 Creando archivo de control..."
    cat > bot-control.json << EOF
{
  "isActive": true,
  "responseMessage": "YO",
  "targetGroupId": ""
}
EOF
    echo "✅ Archivo bot-control.json creado."
fi

if [ ! -f "bot-status.txt" ]; then
    echo "📝 Creando archivo de estado..."
    echo "ACTIVE" > bot-status.txt
    echo "✅ Archivo bot-status.txt creado."
fi

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ejecuta: ./start.sh"
echo "2. Escanea el código QR"
echo "3. Usa los scripts de control:"
echo "   • ./activate.sh   - Activar bot"
echo "   • ./deactivate.sh - Desactivar bot"
echo "   • ./status.sh     - Ver estado"
echo ""
echo "💡 El bot está configurado para ser discreto por defecto." 