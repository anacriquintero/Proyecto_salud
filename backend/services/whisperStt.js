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

    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      timeout: 120000 // 2 minutos timeout
    });

    if (stderr && stderr.trim()) {
      console.warn(`[Whisper] Warnings: ${stderr}`);
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
    console.error(`[Whisper] Error:`, error.message);
    
    // Si el error menciona formato, intentamos convertir
    if (error.message.includes('format') || error.message.includes('codec')) {
      console.log(`[Whisper] Intentando convertir audio a formato compatible...`);
      // Aquí podríamos usar ffmpeg para convertir, pero por ahora lanzamos el error
      throw new Error(`Whisper: Error procesando audio. Formato puede no ser compatible. Detalles: ${error.message}`);
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

