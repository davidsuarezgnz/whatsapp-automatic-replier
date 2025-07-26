# 📋 Comandos NPM - Bot de WhatsApp

## 🚀 Comandos Principales

### Iniciar el Bot
```bash
npm start
```
Inicia el bot de WhatsApp. Muestra el código QR para escanear.

### Activar Bot
```bash
npm run activate
```
Activa el bot para que responda automáticamente a stickers.

### Desactivar Bot
```bash
npm run deactivate
```
Desactiva el bot para que no responda a stickers.

### Ver Estado
```bash
npm run status
```
Muestra el estado actual del bot (activo/inactivo).

### Ver Logs
```bash
npm run logs
```
Muestra los logs del bot en tiempo real.

### Modo Desarrollo
```bash
npm run dev
```
Inicia el bot en modo desarrollo con recarga automática.

### Configuración Inicial
```bash
npm run setup
```
Configura el proyecto por primera vez (instala dependencias, crea archivos de configuración).

## 🎯 Uso Rápido

1. **Configurar** (solo la primera vez):
   ```bash
   npm run setup
   ```

2. **Iniciar** el bot:
   ```bash
   npm start
   ```

3. **Escanear** el código QR con WhatsApp

4. **Controlar** el bot:
   ```bash
   npm run activate   # Cuando quieras que responda
   npm run deactivate # Cuando lleves pedidos
   npm run status     # Para ver el estado
   ```

## 🔧 Comandos Avanzados

### Instalar Dependencias
```bash
npm install
```

### Ver Estado Detallado
```bash
npm run status
```

### Ver Logs en Tiempo Real
```bash
npm run logs
```

## 📝 Notas

- Todos los comandos están organizados en la carpeta `scripts/`
- El bot es completamente discreto por defecto
- Los archivos de control se actualizan automáticamente
- El bot se reconecta automáticamente si se desconecta 