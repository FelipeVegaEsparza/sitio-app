# 🎵 Guía de Configuración para Nuevos Clientes

## ⚠️ IMPORTANTE: Solo Un Lugar para Configurar

Para implementar este sistema para un **nuevo cliente de radio**, **SOLO necesitas modificar UN archivo**:

📁 **`src/utils/api.ts`**

---

## 📝 Pasos para Configurar un Nuevo Cliente

### 1️⃣ Obtener el CLIENT_ID

1. Ingresa al **Dashboard de IpStream**: https://dashboard.ipstream.cl
2. Ve a **Configuración del Proyecto** o **Settings**
3. Copia el **Client ID** (ejemplo: `cmf4du07u000313x255b7jy2t`)

### 2️⃣ Obtener el STREAMING_PORT

Hay dos formas de obtenerlo:

**Opción A - Desde la API:**
```bash
curl "https://dashboard.ipstream.cl/api/public/TU_CLIENT_ID/basic-data"
```

Busca el campo `radioStreamingUrl`:
```json
{
  "radioStreamingUrl": "https://stream.ipstream.cl/8018/stream"
                                                 ^^^^
                                            Este es el puerto
}
```

**Opción B - Desde el Dashboard:**
- Ve a la sección de **Streaming** o **Configuración de Audio**
- Busca el **Puerto del Servidor** o **Server Port**

### 3️⃣ Modificar el Archivo de Configuración

Abre el archivo: **`src/utils/api.ts`**

Modifica **SOLO estas dos líneas**:

```typescript
// ============================================
// CONFIGURACIÓN DEL CLIENTE
// ============================================

/**
 * ID único del cliente en IpStream Dashboard
 */
const CLIENT_ID = 'TU_CLIENT_ID_AQUI';  // ⬅️ CAMBIAR ESTO

/**
 * Puerto del servidor de streaming de SonicPanel
 * DEBE COINCIDIR con el puerto del radioStreamingUrl
 */
const STREAMING_PORT = 8018;  // ⬅️ CAMBIAR ESTO
```

### 4️⃣ Verificar la Configuración

Para verificar que todo está correcto:

```bash
# 1. Verifica que la API responde
curl "https://dashboard.ipstream.cl/api/public/TU_CLIENT_ID/basic-data"

# 2. Verifica el streaming de audio
curl "https://stream.ipstream.cl/cp/get_info.php?p=TU_PUERTO"
```

Ambas peticiones deben devolver JSON válido.

---

## ❌ Lo que NO Debes Hacer

**NO modifiques estos archivos** (ya están configurados para usar `src/utils/api.ts`):

- ❌ `src/templates/default/components/NowPlayingBanner.astro`
- ❌ `src/pages/index.astro`
- ❌ Ningún otro componente

**Todo se actualiza automáticamente** desde `src/utils/api.ts`

---

## 🔍 Ejemplo Completo

### Cliente Actual: Radio Fusión Austral

```typescript
const CLIENT_ID = 'cmf4du07u000313x255b7jy2t';
const STREAMING_PORT = 8018;
```

### Ejemplo: Nuevo Cliente Hipotético

```typescript
const CLIENT_ID = 'abc123xyz456def789';
const STREAMING_PORT = 9020;
```

---

## 🧪 Cómo Probar Después de Cambiar

1. **Reinicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

2. **Abre el navegador** en `http://localhost:4321/`

3. **Abre la consola del navegador** (F12)

4. **Verifica estos logs:**
   ```
   🎵 NowPlayingBanner: radioStreamingUrl recibido del servidor: https://stream.ipstream.cl/XXXX/stream
   🎵 NowPlayingBanner: sonicApiUrl recibido del servidor: https://stream.ipstream.cl/cp/get_info.php?p=XXXX
   ```

5. **Ambos XXXX deben ser el mismo puerto**

6. **Haz clic en el botón Play** y verifica:
   - ✅ Se reproduce el audio
   - ✅ Aparece el título de la canción actual
   - ✅ Aparece el cover/artwork
   - ✅ Muestra el número de oyentes

---

## ⚠️ Errores Comunes

### Error 1: "No se puede reproducir el audio"

**Causa:** El puerto está mal configurado

**Solución:**
1. Verifica que `STREAMING_PORT` coincida con el puerto en `radioStreamingUrl`
2. Asegúrate de que ambos usan el mismo puerto

### Error 2: "No aparece información de la canción"

**Causa:** La API de SonicPanel no responde

**Solución:**
```bash
# Prueba manualmente
curl "https://stream.ipstream.cl/cp/get_info.php?p=TU_PUERTO"
```

Si esto no devuelve JSON, contacta a IpStream para verificar el puerto.

### Error 3: "Error 404 en la API"

**Causa:** El CLIENT_ID es incorrecto

**Solución:**
1. Verifica el CLIENT_ID en el Dashboard de IpStream
2. Asegúrate de copiar el ID completo sin espacios

---

## 📞 Soporte

Si tienes problemas después de configurar:

1. Revisa los logs del navegador (F12 > Console)
2. Verifica que las APIs respondan con los comandos `curl` mencionados
3. Contacta a soporte de IpStream si los endpoints no responden

---

## ✅ Checklist de Configuración

- [ ] Obtuve el CLIENT_ID del Dashboard de IpStream
- [ ] Obtuve el STREAMING_PORT (debe coincidir con radioStreamingUrl)
- [ ] Modifiqué `src/utils/api.ts` con los nuevos valores
- [ ] Probé que la API responde: `/basic-data`
- [ ] Probé que SonicPanel responde: `/cp/get_info.php?p=PUERTO`
- [ ] Reinicié el servidor con `npm run dev`
- [ ] Verifiqué en la consola del navegador que los puertos coinciden
- [ ] El reproductor funciona correctamente
- [ ] Se muestra la información de la canción actual
- [ ] Se muestra el cover/artwork
- [ ] Se muestra el número de oyentes

---

## 🎨 Configuración de Plantillas

### Selección de Plantilla

El sistema soporta múltiples plantillas que puedes configurar en:
📁 **`src/config/site.ts`**

```typescript
export const siteConfig = {
  template: 'default', // Opciones: 'default', 'modern', 'classic'
  // ...otras configuraciones
}
```

### Plantillas Disponibles

1. **default**: Diseño moderno con reproductor flotante
   - Ideal para radios contemporáneas
   - Incluye modo oscuro/claro

2. **modern**: Diseño minimalista con enfoque en visuales
   - Reproductor a pantalla completa
   - Efectos visuales avanzados

3. **classic**: Diseño tradicional
   - Interfaz familiar tipo radio tradicional
   - Optimizado para dispositivos antiguos

### Personalización de Plantillas

Cada plantilla se encuentra en:
📁 **`src/templates/[nombre-plantilla]/`**

Estructura básica:
```
src/templates/
├── default/
│   ├── components/
│   └── layouts/
├── modern/
│   ├── components/
│   └── layouts/
└── classic/
    ├── components/
    └── layouts/
```

---

**Fecha de última actualización:** 2025-11-04
**Versión del sistema:** 1.0
