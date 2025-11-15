/**
 * Configuración centralizada de la API
 * Usa variables de entorno o valores por defecto
 */

// En Vite, las variables de entorno deben empezar con VITE_
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://salud-digital-backend.onrender.com';

export const API_BASE_URL = `${BACKEND_URL}/api`;

// Para desarrollo local, puedes crear un archivo .env.local con:
// VITE_BACKEND_URL=http://localhost:3001

