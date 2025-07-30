# 🪟 Guía Completa para Windows - Bot de WhatsApp

## 📋 Introducción

Esta guía está diseñada para personas **sin conocimientos técnicos** que quieren instalar y usar el bot de WhatsApp automático en Windows. Te guiaré paso a paso con imágenes y explicaciones claras.

---

## 🎯 ¿Qué hace este bot?

- **Detecta stickers** en grupos de WhatsApp
- **Responde automáticamente** con un mensaje (por defecto "YO")
- **Se puede activar/desactivar** fácilmente
- **Funciona 24/7** una vez configurado

---

## ⚙️ Requisitos Previos

### 1. Descargar Node.js
1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión **LTS** (botón verde grande)
3. Ejecuta el instalador y sigue los pasos
4. **Importante**: Marca la casilla "Automatically install the necessary tools"

### 2. Descargar Git (opcional pero recomendado)
1. Ve a [https://git-scm.com/](https://git-scm.com/)
2. Descarga e instala Git para Windows
3. Usa la configuración por defecto

---

## 🚀 Instalación Paso a Paso

### Paso 1: Descargar el Proyecto

#### Opción A: Con Git (Recomendado)
1. Abre el **Símbolo del sistema** (cmd) o **PowerShell**
2. Navega a tu carpeta de documentos:
   ```cmd
   cd C:\Users\TuUsuario\Documents
   ```
3. Descarga el proyecto:
   ```cmd
   git clone https://github.com/tu-usuario/whatsapp-automatic-replier.git
   ```
4. Entra a la carpeta:
   ```cmd
   cd whatsapp-automatic-replier
   ```

#### Opción B: Descarga Manual
1. Ve al repositorio en GitHub
2. Haz clic en el botón verde **"Code"**
3. Selecciona **"Download ZIP"**
4. Extrae el archivo ZIP en tu carpeta de documentos
5. Abre el **Símbolo del sistema** y navega a la carpeta:
   ```cmd
   cd C:\Users\TuUsuario\Documents\whatsapp-automatic-replier
   ```

### Paso 2: Configuración Inicial
1. En el **Símbolo del sistema**, ejecuta:
   ```cmd
   npm run setup
   ```
2. Espera a que termine la instalación (puede tardar unos minutos)

### Paso 3: Configurar el Bot
1. Abre la carpeta del proyecto en el **Explorador de Windows**
2. Busca el archivo `.env` y ábrelo con **Bloc de notas**
3. Edita las siguientes líneas:

```env
# Mensaje que envía al detectar un sticker
BOT_RESPONSE_MESSAGE=YO

# ID del grupo y JID de administrador (cambia estos valores)
TARGET_GROUP_ID=1234567890-0987654321@g.us,5511991234567@s.whatsapp.net

# Habilitar comandos !on/!off
ENABLE_COMMANDS=true

# Nivel de logs
LOG_LEVEL=info
```

**Nota**: Los IDs se obtienen después de la primera ejecución del bot.

---

## 🎮 Cómo Usar el Bot

### Primera Vez - Iniciar el Bot

1. **Abre el Símbolo del sistema** y navega a la carpeta:
   ```cmd
   cd C:\Users\TuUsuario\Documents\whatsapp-automatic-replier
   ```

2. **Ejecuta el bot**:
   ```cmd
   npm start
   ```

3. **Aparecerá un código QR** en la pantalla

4. **Escanea el código QR**:
   - Abre WhatsApp en tu teléfono
   - Ve a **Configuración** > **Dispositivos Vinculados**
   - Toca **"Vincular un dispositivo"**
   - Escanea el código QR que aparece en la pantalla

5. **¡Listo!** El bot está conectado y funcionando

### Controlar el Bot

#### Activar el Bot (para que responda)
```cmd
npm run activate
```

#### Desactivar el Bot (para que no responda)
```cmd
npm run deactivate
```

#### Ver si está funcionando
```cmd
npm run status
```

#### Ver los logs (actividad del bot)
```cmd
npm run logs
```

---

## 🛑 Cómo Parar el Bot

### Método 1: Parar Temporalmente
1. En la ventana donde está ejecutándose el bot
2. Presiona **Ctrl + C**
3. Confirma con **S** o **Y**

### Método 2: Desactivar Respuestas
```cmd
npm run deactivate
```
Esto mantiene el bot conectado pero no responde a stickers.

---

## 🔄 Cómo Volver a Ejecutar

### Después de Pararlo (Ctrl + C)
```cmd
npm start
```

### Después de Desactivarlo
```cmd
npm run activate
```

### Si se Desconectó Automáticamente
```cmd
npm start
```
El bot se reconectará automáticamente.

---

## 📱 Comandos desde WhatsApp

También puedes controlar el bot desde WhatsApp:

- **`!on`** - Activa el bot
- **`!off`** - Desactiva el bot
- **`!status`** - Ver el estado

**Nota**: Estos comandos funcionan en el grupo configurado o en chat privado con el administrador.

---

## 🔧 Solución de Problemas

### Error: "npm no se reconoce"
**Solución**: Node.js no está instalado correctamente
1. Descarga Node.js desde [https://nodejs.org/](https://nodejs.org/)
2. Instálalo y reinicia el Símbolo del sistema

### Error: "El comando no se reconoce"
**Solución**: No estás en la carpeta correcta
1. Verifica que estés en la carpeta del proyecto:
   ```cmd
   dir
   ```
2. Debes ver archivos como `package.json`, `README.md`, etc.

### El bot no responde a stickers
**Solución**: Verifica el estado
1. Ejecuta: `npm run status`
2. Si dice "INACTIVE", ejecuta: `npm run activate`

### Error de conexión
**Solución**: Reinicia la autenticación
1. Para el bot con **Ctrl + C**
2. Ejecuta: `npm start`
3. Escanea el código QR nuevamente

### El código QR no aparece
**Solución**: Verifica la instalación
1. Ejecuta: `npm run setup`
2. Luego: `npm start`

---

## 📊 Monitoreo del Bot

### Ver Logs en Tiempo Real
```cmd
npm run logs
```
Esto te muestra toda la actividad del bot.

### Ver Estado Actual
```cmd
npm run status
```
Te dice si el bot está activo o inactivo.

---

## 🗂️ Archivos Importantes

En la carpeta del proyecto encontrarás:

- **`.env`** - Configuración del bot
- **`bot-status.txt`** - Estado actual (ACTIVE/INACTIVE)
- **`bot-control.json`** - Configuración dinámica
- **`auth_info_baileys/`** - Credenciales de WhatsApp

**No elimines estos archivos** a menos que quieras reconfigurar todo.

---

## 🔄 Actualizaciones

Para actualizar el bot:

1. **Para el bot** con **Ctrl + C**
2. **Descarga la nueva versión**:
   ```cmd
   git pull
   ```
3. **Reinstala dependencias**:
   ```cmd
   npm install
   ```
4. **Inicia el bot**:
   ```cmd
   npm start
   ```

---

## 📞 Soporte

Si tienes problemas:

1. **Revisa esta guía** paso a paso
2. **Verifica los logs**: `npm run logs`
3. **Revisa el estado**: `npm run status`
4. **Reinicia el bot**: `npm start`

---

## ⚠️ Consejos Importantes

- **Mantén el bot ejecutándose** para que funcione 24/7
- **No cierres la ventana** donde está ejecutándose el bot
- **Guarda la carpeta** del proyecto en un lugar seguro
- **Haz copias de seguridad** de los archivos `.env` y `auth_info_baileys/`
- **El bot es discreto** y solo responde cuando está activo

---

## 🎉 ¡Listo!

Ahora tienes tu bot de WhatsApp funcionando en Windows. El bot:

- ✅ Se conecta automáticamente
- ✅ Detecta stickers en grupos
- ✅ Responde con tu mensaje personalizado
- ✅ Se puede activar/desactivar fácilmente
- ✅ Funciona 24/7

¡Disfruta de tu bot automático! 🤖 