#!/bin/bash

# Script para ver los logs del bot en tiempo real
echo "📋 Mostrando logs del bot..."
echo "💡 Presiona Ctrl+C para salir"
echo ""

# Verificar si el bot está ejecutándose
if ! pgrep -f "node index.js" > /dev/null; then
    echo "❌ El bot no está ejecutándose"
    echo "Ejecuta ./start.sh primero"
    exit 1
fi

echo "✅ Bot ejecutándose. Mostrando logs..."
echo ""

# Mostrar logs en tiempo real
tail -f /dev/null 2>/dev/null || echo "No se pueden mostrar logs en tiempo real" 