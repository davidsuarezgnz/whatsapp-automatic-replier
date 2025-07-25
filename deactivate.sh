#!/bin/bash

# Script para desactivar el bot discretamente
echo "🔴 Desactivando bot..."

# Opción 1: Usar bot-status.txt
echo "INACTIVE" > bot-status.txt

# Opción 2: Usar bot-control.json
cat > bot-control.json << EOF
{
  "isActive": false,
  "responseMessage": "YO",
  "targetGroupId": ""
}
EOF

echo "✅ Bot desactivado discretamente"
echo "💡 El bot se actualizará automáticamente en unos segundos" 