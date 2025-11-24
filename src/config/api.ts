/**
 * Configuración centralizada de la API
 * Usa VITE_BACKEND_URL si está definida; por defecto usa la URL de Render
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://proyecto-salud-digital-2.onrender.com';
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Log para debugging
console.log('🔧 Configuración API:', {
  BACKEND_URL,
  API_BASE_URL
});
