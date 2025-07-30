# 🤖 WhatsApp Auto Replier Bot

Bot automático de WhatsApp que responde con un mensaje personalizado cuando detecta stickers en grupos específicos.

---

## 📋 Descripción

Este bot utiliza la librería [Baileys](https://github.com/whiskeysockets/baileys) para:

- **Detectar stickers** automáticamente en grupos de WhatsApp configurados
- **Responder** con un mensaje personalizado (por defecto "YO")
- **Control remoto** mediante comandos `!on` y `!off` desde el grupo o chat privado
- **Configuración flexible** a través de archivos de configuración
- **Reconexión automática** si se pierde la conexión
- **Logs detallados** para monitoreo y debugging

---

## ⚙️ Requisitos del Sistema

- **Node.js** v16 o superior
- **npm** (incluido con Node.js)
- **Cuenta de WhatsApp** activa
- **Acceso a terminal/consola**

---

## 🚀 Instalación Rápida

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/whatsapp-automatic-replier.git
cd whatsapp-automatic-replier
```

### 2. Configuración automática
```bash
npm run setup
```

### 3. Configurar variables de entorno
Edita el archivo `.env` creado:
```env
# Mensaje de respuesta al sticker
BOT_RESPONSE_MESSAGE=YO

# ID del grupo y JID de administrador (separados por coma)
TARGET_GROUP_ID=1234567890-0987654321@g.us,5511991234567@s.whatsapp.net

# Habilitar comandos !on/!off
ENABLE_COMMANDS=true

# Nivel de logs
LOG_LEVEL=info
```

### 4. Iniciar el bot
```bash
npm start
```

---

## 📁 Estructura del Proyecto

```
whatsapp-automatic-replier/
├── auth_info_baileys/     # Credenciales de WhatsApp
├── src/
│   ├── config/
│   │   └── loader.js      # Carga de configuración
│   ├── handlers/
│   │   ├── commands.js    # Comandos !on/!off
│   │   ├── connection.js  # Gestión de conexión
│   │   └── messages.js    # Lógica de stickers
│   ├── services/
│   │   └── whatsapp.js    # Cliente de Baileys
│   ├── utils/
│   │   └── logger.js      # Sistema de logs
│   └── index.js           # Punto de entrada
├── scripts/               # Scripts de control
├── .env                   # Variables de entorno
├── bot-control.json       # Configuración dinámica
├── bot-status.txt         # Estado del bot
└── package.json
```

---

## 🎮 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el bot |
| `npm run activate` | Activa el bot |
| `npm run deactivate` | Desactiva el bot |
| `npm run status` | Muestra el estado actual |
| `npm run logs` | Muestra logs en tiempo real |
| `npm run setup` | Configuración inicial |

---

## 🔧 Configuración Detallada

### Variables de Entorno (.env)

```env
# Mensaje que envía al detectar un sticker
BOT_RESPONSE_MESSAGE=YO

# ID del grupo y JID de administrador
# Formato: groupJID,adminJID
TARGET_GROUP_ID=1234567890-0987654321@g.us,5511991234567@s.whatsapp.net

# Habilitar comandos en chat
ENABLE_COMMANDS=true

# Nivel de logs: debug|info|warn|error
LOG_LEVEL=info
```

### Obtener IDs de WhatsApp

1. **ID del Grupo**: Envía un mensaje al grupo y revisa los logs
2. **JID de Administrador**: Tu número con formato `5511991234567@s.whatsapp.net`

---

## 📱 Uso del Bot

### Primer Uso
1. Ejecuta `npm start`
2. Escanea el código QR con WhatsApp
3. El bot se conectará automáticamente

### Control del Bot
- **Activar**: `npm run activate` o enviar `!on` al grupo
- **Desactivar**: `npm run deactivate` o enviar `!off` al grupo
- **Estado**: `npm run status`

### Funcionamiento
- El bot detecta stickers en el grupo configurado
- Responde automáticamente con el mensaje configurado
- Solo responde cuando está activo
- Los comandos funcionan desde el grupo o chat privado del admin

---

## 🛠️ Solución de Problemas

### Error de Conexión
```bash
npm run logs
```
Revisa los logs para identificar el problema.

### Reiniciar Autenticación
```bash
rm -rf auth_info_baileys/
npm start
```

### Actualizar Dependencias
```bash
npm install
```

---

## 📊 Monitoreo

### Ver Logs en Tiempo Real
```bash
npm run logs
```

### Ver Estado del Bot
```bash
npm run status
```

### Archivos de Control
- `bot-status.txt`: Estado ACTIVE/INACTIVE
- `bot-control.json`: Configuración dinámica
- `auth_info_baileys/`: Credenciales de WhatsApp

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de [Solución de Problemas](#solución-de-problemas)
2. Consulta los [logs](#monitoreo) para más detalles
3. Abre un issue en GitHub

---

## 🔄 Actualizaciones

Para actualizar el bot:

```bash
git pull origin main
npm install
npm start
```