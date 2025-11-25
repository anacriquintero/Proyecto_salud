const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

const WHISPER_MODEL = process.env.WHISPER_MODEL || 'base';
const PYTHON_CMD = process.env.PYTHON_CMD || 'python3';

/**
 * Transcribe audio usando Whisper local
 * @param {Buffer} audioBuffer - Buffer del audio
 * @param {string} contentType - Tipo MIME del audio (ej: 'audio/webm')
 * @param {string} filename - Nombre del archivo original
 * @returns {Promise<string>} Texto transcrito
 */
async function transcribeWithWhisper({ audioBuffer, contentType, filename }) {
  const scriptPath = path.join(__dirname, '../integrations/whisper_stt/transcribe.py');
  const tempDir = path.join(__dirname, '../../temp');
  const tempFilePath = path.join(tempDir, `audio_${Date.now()}_${Math.random().toString(36).substring(7)}.webm`);

  // Crear directorio temporal si no existe
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  try {
    // Guardar el buffer de audio en un archivo temporal
    fs.writeFileSync(tempFilePath, audioBuffer);
    console.log(`[Whisper] Archivo temporal creado: ${tempFilePath}`);

    // Convertir webm a wav/mp3 si es necesario (Whisper funciona mejor con wav/mp3)
    // Por ahora intentamos directamente con webm, si falla convertimos
    let audioFile = tempFilePath;
    let needsCleanup = false;

    // Ejecutar script de Whisper
    const command = `${PYTHON_CMD} "${scriptPath}" "${audioFile}" "${WHISPER_MODEL}" "es"`;
    console.log(`[Whisper] Ejecutando: ${command}`);
    console.log(`[Whisper] Modelo: ${WHISPER_MODEL}, Idioma: es, Timeout: 5 minutos`);
    const startTime = Date.now();

    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      timeout: 300000 // 5 minutos timeout (la primera vez puede tardar por descarga del modelo)
    });

    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[Whisper] Proceso completado en ${elapsedTime} segundos`);

    if (stderr && stderr.trim()) {
      // Filtrar warnings comunes de Whisper que no son errores
      const stderrLines = stderr.trim().split('\n');
      const importantWarnings = stderrLines.filter(line => 
        !line.includes('torch') && 
        !line.includes('UserWarning') &&
        !line.includes('FutureWarning')
      );
      if (importantWarnings.length > 0) {
        console.warn(`[Whisper] Warnings importantes: ${importantWarnings.join('; ')}`);
      }
    }

    // Parsear resultado JSON
    const result = JSON.parse(stdout.trim());
    
    if (result.error) {
      throw new Error(`Whisper error: ${result.error}`);
    }

    if (!result.success || !result.text) {
      throw new Error('Whisper no retornó texto transcrito');
    }

    console.log(`[Whisper] Transcripción exitosa: ${result.text.substring(0, 50)}...`);
    return result.text;

  } catch (error) {
    console.error(`[Whisper] Error capturado:`, error.message);
    console.error(`[Whisper] Stack:`, error.stack);
    
    // Si es timeout
    if (error.message.includes('timeout') || error.code === 'ETIMEDOUT') {
      throw new Error(`Whisper: Timeout después de 5 minutos. La primera transcripción puede tardar más por la descarga del modelo (~74 MB). Intenta nuevamente.`);
    }
    
    // Si el error menciona formato, intentamos convertir
    if (error.message.includes('format') || error.message.includes('codec')) {
      console.log(`[Whisper] Intentando convertir audio a formato compatible...`);
      throw new Error(`Whisper: Error procesando audio. Formato puede no ser compatible. Detalles: ${error.message}`);
    }
    
    // Si el error es de Python o del script
    if (error.message.includes('Command failed') || error.stderr) {
      const errorDetails = error.stderr || error.message;
      console.error(`[Whisper] Error de Python:`, errorDetails);
      throw new Error(`Whisper: Error ejecutando script Python. Verifica que Whisper esté instalado. Detalles: ${errorDetails.substring(0, 200)}`);
    }
    
    throw new Error(`Whisper: ${error.message}`);
  } finally {
    // Limpiar archivo temporal
    try {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
        console.log(`[Whisper] Archivo temporal eliminado: ${tempFilePath}`);
      }
      if (needsCleanup && fs.existsSync(audioFile) && audioFile !== tempFilePath) {
        fs.unlinkSync(audioFile);
      }
    } catch (cleanupError) {
      console.warn(`[Whisper] Error limpiando archivos temporales:`, cleanupError.message);
    }
  }
}

module.exports = {
  transcribeWithWhisper
};

