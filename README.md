# Bot Automático de WhatsApp - Respondedor de Stickers

Este bot automáticamente responde "YO" cuando detecta un sticker en un grupo de WhatsApp, perfecto para restaurantes que publican stickers cuando tienen pedidos. **Usa Baileys para mayor eficiencia y discreción.**

## 🚀 Características

- ✅ Responde automáticamente "YO" a stickers
- ✅ **Control discreto** - Sin comandos visibles en el grupo
- ✅ Activación/desactivación en tiempo real
- ✅ Funciona en grupos específicos o todos los grupos
- ✅ **Usa Baileys** - Más eficiente que whatsapp-web.js
- ✅ Logs detallados en consola

## 📋 Requisitos

- Node.js (versión 14 o superior)
- WhatsApp (no necesita WhatsApp Web)

## 🛠️ Instalación

1. **Clona o descarga este proyecto**
   ```bash
   git clone <tu-repositorio>
   cd whatsapp-automatic-replier
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno (opcional)**
   ```bash
   cp env.example .env
   ```
   
   Edita el archivo `.env` y agrega el ID del grupo donde quieres que funcione el bot:
   ```
   TARGET_GROUP_ID=123456789@c.us
   ```

## 🚀 Uso

### Opción 1: Script de inicio (Recomendado)
```bash
./start.sh
```

### Opción 2: Comando directo
```bash
npm start
```

### Escaneo del código QR
- Se mostrará un código QR en la terminal
- Escanéalo con WhatsApp en tu teléfono
- El bot se conectará automáticamente

## 🎛️ Control Discreto

El bot está diseñado para ser **completamente discreto**. Puedes controlarlo sin que el grupo sepa:

### Opción 1: Scripts Rápidos
```bash
./activate.sh   # Activar bot
./deactivate.sh # Desactivar bot
./status.sh     # Ver estado
```

### Opción 2: Archivos de Control
- **`bot-control.json`** - Configuración completa
- **`bot-status.txt`** - Solo ACTIVE/INACTIVE
- **Variables de entorno** - BOT_ACTIVE=true/false

### Opción 3: Comandos Discretos (Opcional)
Si habilitas los comandos, puedes usar:
- `!on` - Activar discretamente
- `!off` - Desactivar discretamente

## ⚙️ Configuración

### Configuración Básica
Edita el archivo `config.js` para personalizar:
- Mensaje de respuesta
- Estado inicial del bot
- Configuración de logs
- Comandos opcionales

### Grupo Específico
Si quieres que el bot solo funcione en un grupo específico:

1. Ejecuta el bot sin configurar `TARGET_GROUP_ID`
2. Observa los logs para ver el ID del grupo
3. Agrega ese ID en el archivo `.env`:
   ```
   TARGET_GROUP_ID=el_id_del_grupo@c.us
   ```
4. Reinicia el bot

### Todos los Grupos
Si quieres que funcione en todos los grupos, simplemente no configures `TARGET_GROUP_ID`.

### Personalización Avanzada
- **Mensaje de respuesta**: Cambia `responseMessage` en `config.js`
- **Logs**: Configura `logging` para mostrar/ocultar información
- **Comandos**: Deshabilita completamente con `ENABLE_COMMANDS=false`
- **Mensajes**: Modifica los mensajes de respuesta en `messages`

## 🔧 Desarrollo

Para desarrollo con recarga automática:
```bash
npm run dev
```

## 📝 Logs

El bot muestra logs detallados en la consola:
- Cuando detecta un sticker
- Cuando envía una respuesta
- Estado de activación/desactivación
- Errores de conexión

## ⚠️ Notas Importantes

- **Seguridad**: Nunca compartas tu sesión de WhatsApp
- **Uso Responsable**: Usa el bot de manera responsable
- **Discreción**: El bot está diseñado para ser discreto
- **Backup**: Mantén una copia de seguridad de tu chat
- **Baileys**: Usa la librería oficial de WhatsApp, más estable

## 🐛 Solución de Problemas

### Error de Conexión
- Verifica tu conexión a internet
- Asegúrate de que WhatsApp esté disponible

### No Responde a Stickers
- Verifica que el bot esté ACTIVADO con `./status.sh`
- Confirma que estés en el grupo correcto
- Revisa los logs en la consola

### Error de Autenticación
- Elimina el archivo `auth_info.json` si existe
- Reinicia el bot y escanea el QR nuevamente

### Comandos No Funcionan
- Los comandos están deshabilitados por defecto
- Para habilitarlos, agrega `ENABLE_COMMANDS=true` en `.env`

## 📄 Licencia

MIT License - Usa libremente para proyectos personales y comerciales. 