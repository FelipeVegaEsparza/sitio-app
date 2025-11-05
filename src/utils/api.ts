// ============================================
// CONFIGURACIÓN DEL CLIENTE
// ============================================
// ⚠️ IMPORTANTE: Al implementar para un nuevo cliente, SOLO cambia estos valores:

/**
 * ID único del cliente en IpStream Dashboard
 * Ubicación: Dashboard IpStream > Configuración del Proyecto
 */
const CLIENT_ID = 'cmf4du07u000313x255b7jy2t';

/**
 * Puerto del servidor de streaming de SonicPanel
 * DEBE COINCIDIR con el puerto del radioStreamingUrl que devuelve /basic-data
 * Ejemplo: Si radioStreamingUrl = "https://stream.ipstream.cl/8018/stream" → STREAMING_PORT = 8018
 */
const STREAMING_PORT = 8018;

// ============================================
// URLs AUTOMÁTICAS (No modificar)
// ============================================
const IPSTREAM_API_BASE_URL = `https://dashboard.ipstream.cl/api/public/${CLIENT_ID}`;
const IPSTREAM_BASE_URL = 'https://dashboard.ipstream.cl';
const SONIC_API_URL = `https://stream.ipstream.cl/cp/get_info.php?p=${STREAMING_PORT}`;

// ============================================
// EXPORTAR CONFIGURACIÓN
// ============================================
export const CONFIG = {
  CLIENT_ID,
  STREAMING_PORT,
  IPSTREAM_API_BASE_URL,
  IPSTREAM_BASE_URL,
  SONIC_API_URL,
};

/**
 * Obtiene datos de un endpoint específico de la API de Ipstream.
 * @param {string} endpoint - El endpoint específico a consultar (ej. '/basic-data').
 * @returns {Promise<Object|null>} - La data en formato JSON o null si hay un error.
 */
export async function getIpstreamData<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${IPSTREAM_API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json() as T;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

/**
 * Obtiene los datos de la canción actual desde la API de SonicPanel.
 * @returns {Promise<Object|null>} Un objeto con los datos de la canción o null si hay un error.
 */
export async function getCurrentSongData(): Promise<any | null> {
  try {
    // Se añade un parámetro aleatorio para evitar problemas de caché del navegador.
    const response = await fetch(`${SONIC_API_URL}&rand=${Date.now()}`);
    if (!response.ok) {
      console.error(`Error HTTP: ${response.status} al obtener datos de SonicPanel`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('No se pudo obtener la información de la canción actual desde SonicPanel:', error);
    return null;
  }
}

/**
 * Construye la URL completa para una imagen de Ipstream.
 * @param {string} relativePath - La ruta relativa de la imagen (ej. '/api/uploads/...').
 * @returns {string} La URL completa de la imagen.
 */
export function getFullImageUrl(path: string): string {
  if (!path) return '/image/default.jpg';
  return path.startsWith('http') ? path : `https://dashboard.ipstream.cl${path}`;
}

export const getStreamingUrl = async () => {
  return `https://stream.ipstream.cl/${STREAMING_PORT}/stream`;
};

export const getSonicPanelUrl = async () => {
  return `https://stream.ipstream.cl/cp/get_info.php?p=${STREAMING_PORT}`;
};
