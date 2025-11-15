/**
 * Configuración centralizada de la API
 * Usa variables de entorno o valores por defecto
 */

// URL de producción por defecto
const PRODUCTION_BACKEND_URL = 'https://salud-digital-backend.onrender.com';
const LOCAL_BACKEND_URL = 'http://localhost:3001';

// En Vite, las variables de entorno deben empezar con VITE_
// En producción (Vercel), siempre usa la URL de producción a menos que se configure explícitamente
// En desarrollo local, usa localhost o la variable de entorno
const getBackendUrl = (): string => {
  // Si estamos en modo producción (build de Vercel), siempre usar producción
  if (import.meta.env.MODE === 'production' || import.meta.env.PROD) {
    const envUrl = import.meta.env.VITE_BACKEND_URL?.trim();
    // Solo usar variable de entorno si existe y NO es localhost (seguridad)
    if (envUrl && envUrl !== '' && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl;
    }
    // Por defecto en producción, usar URL de producción
    return PRODUCTION_BACKEND_URL;
  }
  
  // En desarrollo local
  const envUrl = import.meta.env.VITE_BACKEND_URL?.trim();
  if (envUrl && envUrl !== '') {
    return envUrl;
  }
  
  // Por defecto en desarrollo, usar localhost
  return LOCAL_BACKEND_URL;
};

const BACKEND_URL = getBackendUrl();
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Log siempre para debugging (especialmente útil en producción)
console.log('🔧 Configuración API:', {
  BACKEND_URL,
  API_BASE_URL,
  MODE: import.meta.env.MODE,
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL || '(no configurado)'
});

