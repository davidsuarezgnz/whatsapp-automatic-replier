#!/bin/bash

# Script para activar el bot discretamente
echo "🟢 Activando bot..."

# Opción 1: Usar bot-status.txt
echo "ACTIVE" > bot-status.txt

# Opción 2: Usar bot-control.json
cat > bot-control.json << EOF
{
  "isActive": true,
  "responseMessage": "YO",
  "targetGroupId": ""
}
EOF

echo "✅ Bot activado discretamente"
echo "💡 El bot se actualizará automáticamente en unos segundos" 