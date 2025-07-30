# 📋 Comandos del Bot de WhatsApp

## 🚀 Comandos Principales

### Iniciar el Bot
```bash
npm start
```
**Descripción**: Inicia el bot de WhatsApp y muestra el código QR para escanear.
**Uso**: Ejecutar cuando quieras poner en funcionamiento el bot.

### Activar Bot
```bash
npm run activate
```
**Descripción**: Activa el bot para que responda automáticamente a stickers.
**Uso**: Cuando quieras que el bot comience a responder.

### Desactivar Bot
```bash
npm run deactivate
```
**Descripción**: Desactiva el bot para que no responda a stickers.
**Uso**: Cuando quieras pausar las respuestas automáticas.

### Ver Estado
```bash
npm run status
```
**Descripción**: Muestra el estado actual del bot (activo/inactivo).
**Uso**: Para verificar si el bot está funcionando.

### Ver Logs
```bash
npm run logs
```
**Descripción**: Muestra los logs del bot en tiempo real.
**Uso**: Para monitorear la actividad y detectar problemas.

### Configuración Inicial
```bash
npm run setup
```
**Descripción**: Configura el proyecto por primera vez (instala dependencias, crea archivos de configuración).
**Uso**: Solo la primera vez que instalas el bot.

---

## 🎯 Guía de Uso Rápido

### 1. Configuración Inicial (Solo una vez)
```bash
npm run setup
```

### 2. Iniciar el Bot
```bash
npm start
```

### 3. Escanear Código QR
- Abre WhatsApp en tu teléfono
- Ve a Configuración > Dispositivos Vinculados
- Escanea el código QR que aparece en la terminal

### 4. Controlar el Bot
```bash
npm run activate   # Activar cuando quieras que responda
npm run deactivate # Desactivar cuando no quieras respuestas
npm run status     # Verificar el estado actual
```

---

## 🔧 Comandos Avanzados

### Instalar Dependencias
```bash
npm install
```
**Descripción**: Instala todas las dependencias necesarias del proyecto.

### Modo Desarrollo
```bash
npm run dev
```
**Descripción**: Inicia el bot en modo desarrollo con recarga automática.
**Uso**: Para desarrollo y testing.

### Ver Estado Detallado
```bash
npm run status
```
**Descripción**: Muestra información detallada sobre el estado del bot.

### Ver Logs en Tiempo Real
```bash
npm run logs
```
**Descripción**: Muestra logs en tiempo real para debugging.

---

## 📝 Comandos de Chat

### Comandos Disponibles en WhatsApp
- `!on` - Activa el bot
- `!off` - Desactiva el bot
- `!status` - Muestra el estado del bot

**Nota**: Estos comandos funcionan tanto en el grupo configurado como en chat privado con el administrador.

---

## 🛠️ Comandos de Mantenimiento

### Reiniciar Autenticación
```bash
rm -rf auth_info_baileys/
npm start
```
**Descripción**: Elimina las credenciales guardadas y fuerza una nueva autenticación.

### Actualizar Dependencias
```bash
npm install
```
**Descripción**: Actualiza todas las dependencias a las últimas versiones.

### Limpiar Cache
```bash
npm cache clean --force
```
**Descripción**: Limpia la caché de npm si hay problemas de instalación.

---

## 📊 Monitoreo y Debugging

### Ver Logs Detallados
```bash
npm run logs
```
**Descripción**: Muestra logs en tiempo real con información detallada.

### Ver Estado del Sistema
```bash
npm run status
```
**Descripción**: Muestra el estado actual del bot y la configuración.

### Verificar Archivos de Control
- `bot-status.txt`: Contiene ACTIVE o INACTIVE
- `bot-control.json`: Configuración dinámica del bot
- `auth_info_baileys/`: Credenciales de WhatsApp

---

## ⚠️ Solución de Problemas

### Bot No Responde
1. Verifica el estado: `npm run status`
2. Activa el bot: `npm run activate`
3. Revisa los logs: `npm run logs`

### Error de Conexión
1. Reinicia el bot: `npm start`
2. Si persiste, reinicia autenticación:
   ```bash
   rm -rf auth_info_baileys/
   npm start
   ```

### Problemas de Instalación
1. Limpia caché: `npm cache clean --force`
2. Reinstala dependencias: `npm install`
3. Ejecuta setup: `npm run setup`

---

## 📋 Notas Importantes

- **Todos los comandos** están organizados en la carpeta `scripts/`
- **El bot es discreto** por defecto y solo responde cuando está activo
- **Los archivos de control** se actualizan automáticamente
- **El bot se reconecta** automáticamente si se desconecta
- **Los logs** se guardan automáticamente para debugging
- **La configuración** se puede cambiar sin reiniciar el bot

---

## 🔄 Flujo de Trabajo Típico

1. **Configuración**: `npm run setup` (solo una vez)
2. **Inicio**: `npm start`
3. **Activación**: `npm run activate`
4. **Monitoreo**: `npm run logs` (opcional)
5. **Desactivación**: `npm run deactivate` (cuando sea necesario)
6. **Verificación**: `npm run status` (para confirmar estado) 