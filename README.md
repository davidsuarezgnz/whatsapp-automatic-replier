# WhatsApp Auto Bot

Bot de WhatsApp automático para responder con un mensaje (por defecto **YO**) al recibir un sticker en un grupo específico.

---

## 📖 Descripción

Este proyecto implementa un bot de WhatsApp usando la librería [Baileys](https://github.com/whiskeysockets/baileys) para:

- Detectar stickers en un grupo de WhatsApp.
- Responder automáticamente con un texto configurado (por defecto `YO`).
- Permitir activar o desactivar el bot desde el grupo o desde un chat privado de administrador.
- Mantener configuración en archivos JSON/TXT y variables de entorno.

---

## ⚙️ Requisitos

- **Node.js** v16 o superior.
- **npm**.
- Cuenta de WhatsApp configurada con Scanner QR (a través de Baileys).
- Acceso a la terminal/bash.

---

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/whatsapp-auto-bot.git
   cd whatsapp-auto-bot
   ```
2. Ejecuta el script de setup:
   ```bash
   npm run setup
   ```

---

## 🗂️ Estructura del proyecto

```
|-- .wwebjs_auth/        # Credenciales de WhatsApp (Gitignored)
|-- bot-control.json     # Configuración dinámica (isActive, message…)
|-- bot-status.txt       # Estado ACTIVE/INACTIVE
|-- .env.example         # Ejemplo de variables de entorno
|-- package.json
|-- README.md
|-- src/
|   |-- config/loader.js     # Carga y recarga de config
|   |-- handlers/
|   |   |-- connection.js    # Reconexión y logs
|   |   |-- commands.js      # !on / !off
|   |   `-- messages.js      # Lógica de sticker → respuesta
|   |-- services/whatsapp.js # Wrapper de Baileys
|   |-- utils/logger.js      # Logger con pino
|   `-- index.js             # Entrypoint del bot
|-- scripts/
    |-- activate.sh
    |-- deactivate.sh
    |-- setup.sh
    |-- start.sh
    `-- status.sh
```

---

## 📑 Configuración

Copia `.env.example` a `.env` y completa los valores:

```dotenv
# ¿El bot inicia activo? true|false
BOT_ACTIVE=true

# Mensaje que envía al detectar un sticker
BOT_RESPONSE_MESSAGE=YO

# ID del grupo y JID admin separados por coma
TARGET_GROUP_ID=1234567890-0987654321@g.us,5511991234567@s.whatsapp.net

# Permitir comandos !on/!off en grupo o privado
ENABLE_COMMANDS=true

# Nivel de logs: debug|info|warn|error
LOG_LEVEL=info
```

- **TARGET_GROUP_ID**: formato `groupJID,adminJID`. Usa tu `groupJID` (p.ej. `1234567890-0987654321@g.us`) y tu número personal con sufijo `@s.whatsapp.net`.

---

## 🚀 Scripts disponibles

| Comando              | Descripción                                  |
|----------------------|----------------------------------------------|
| `npm run setup`      | Instala dependencias y prepara `.env`        |
| `npm run start`      | Inicia el bot                                |
| `npm run activate`   | Activa el bot (`ACTIVE` en bot-status.txt)   |
| `npm run deactivate` | Desactiva el bot (`INACTIVE` en bot-status.txt) |
| `npm run status`     | Muestra el estado actual del bot             |

---

## 📦 Uso

1. **Inicia** el bot:
   ```bash
   npm run start
   ```
2. **Escanea** el QR si es la primera vez.
3. Envía un sticker en el grupo configurado.
4. El bot responderá con el mensaje configurado.
5. Para **activar/desactivar**, usa `!on` o `!off` en el grupo o envía estos comandos en tu chat privado de administrador.

---

## 🤝 Contribuciones

Si quieres mejorar este proyecto, abre un _issue_ o _pull request_. ¡Todas las contribuciones son bienvenidas!

---

## 📄 Licencia

[MIT](./LICENSE)