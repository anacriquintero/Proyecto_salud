/**
 * Configuración centralizada de la API
 * Siempre apunta a la URL de producción
 */

// URL del backend - Siempre apunta a producción
const BACKEND_URL = 'https://salud-digital-backend.onrender.com/api';
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Log para debugging
console.log('🔧 Configuración API:', {
  BACKEND_URL,
  API_BASE_URL
});

