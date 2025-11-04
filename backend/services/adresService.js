// backend/services/adresService.js
// Servicio para consultar datos de pacientes desde ADRES/BDUA
// Estructura preparada para múltiples proveedores de API

const fetch = require('node-fetch');
require('dotenv').config();

/**
 * Consulta datos de un paciente por número de documento
 * @param {string} numeroDocumento - Número de documento (cédula)
 * @param {string} tipoDocumento - Tipo de documento (CC, TI, CE)
 * @returns {Promise<Object>} Datos del paciente encontrados
 */
async function consultarADRES(numeroDocumento, tipoDocumento = 'CC') {
  try {
    // Por ahora, implementamos una estructura base
    // que puede ser fácilmente reemplazada cuando haya API oficial disponible
    
    // Opción 1: Intentar con API de hiSmart (si está disponible)
    // Nota: Esta API puede requerir credenciales y tener costos
    // const result = await consultarHiSmart(numeroDocumento, tipoDocumento);
    // if (result) return result;
    
    // Opción 2: Estructura base que retorna null para indicar que no hay datos
    // Esto permite que el frontend maneje el caso y permita entrada manual
    console.log(`[ADRES] Consultando datos para documento: ${numeroDocumento} (${tipoDocumento})`);
    
    // Por ahora retornamos null para indicar que no hay datos disponibles
    // Esto puede ser reemplazado con una llamada real a API cuando esté disponible
    return null;
    
    // Ejemplo de estructura de respuesta esperada:
    // {
    //   nombres: "Juan Carlos",
    //   apellidos: "Pérez García",
    //   fecha_nacimiento: "1990-05-15",
    //   eps: "SURA",
    //   regimen: "Contributivo",
    //   numero_afiliacion: "123456789",
    //   estado_afiliacion: "Activo"
    // }
  } catch (error) {
    console.error('[ADRES] Error consultando datos:', error);
    throw new Error(`Error consultando ADRES: ${error.message}`);
  }
}

/**
 * Consulta usando API de hiSmart (si está disponible)
 * Nota: Esta función requiere credenciales y puede tener costos
 */
async function consultarHiSmart(numeroDocumento, tipoDocumento) {
  try {
    const apiKey = process.env.HISMART_API_KEY;
    const apiUrl = process.env.HISMART_API_URL || 'https://hismart.com.co/toolbar/public/ApiRest/identity_validation';
    
    if (!apiKey) {
      console.log('[ADRES] HiSmart API key no configurada, omitiendo consulta');
      return null;
    }
    
    // Crear token de autenticación básica
    const authToken = Buffer.from(apiKey).toString('base64');
    
    const formData = new URLSearchParams();
    formData.append('document_type', tipoDocumento);
    formData.append('document_number', numeroDocumento);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
    
    if (!response.ok) {
      console.error('[ADRES] Error en respuesta de hiSmart:', response.status);
      return null;
    }
    
    const data = await response.json();
    
    // Mapear respuesta de hiSmart a formato estándar
    if (data && data.success) {
      return {
        nombres: data.first_name || data.nombres || '',
        apellidos: `${data.last_name || ''} ${data.second_last_name || ''}`.trim() || data.apellidos || '',
        fecha_nacimiento: data.birth_date || data.fecha_nacimiento || null,
        eps: data.eps || data.health_insurance || null,
        regimen: data.regimen || null,
        numero_afiliacion: data.affiliation_number || null,
        estado_afiliacion: data.affiliation_status || 'Activo'
      };
    }
    
    return null;
  } catch (error) {
    console.error('[ADRES] Error en consulta hiSmart:', error);
    return null;
  }
}

/**
 * Consulta usando API oficial de ADRES (cuando esté disponible)
 */
async function consultarADRESOficial(numeroDocumento, tipoDocumento) {
  try {
    const apiUrl = process.env.ADRES_API_URL;
    const apiKey = process.env.ADRES_API_KEY;
    
    if (!apiUrl || !apiKey) {
      console.log('[ADRES] API oficial no configurada');
      return null;
    }
    
    const response = await fetch(`${apiUrl}/consultar-afiliado`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tipo_documento: tipoDocumento,
        numero_documento: numeroDocumento
      })
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[ADRES] Error en consulta oficial:', error);
    return null;
  }
}

module.exports = {
  consultarADRES,
  consultarHiSmart,
  consultarADRESOficial
};

