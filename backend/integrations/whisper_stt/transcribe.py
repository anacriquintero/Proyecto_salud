#!/usr/bin/env python3
"""
Script para transcribir audio usando Whisper de OpenAI.
Uso: python transcribe.py <ruta_audio> [modelo] [idioma]
"""
import sys
import os
import json
import whisper

def transcribe_audio(audio_path, model_name='base', language='es'):
    """
    Transcribe un archivo de audio usando Whisper.
    
    Args:
        audio_path: Ruta al archivo de audio
        model_name: Modelo de Whisper a usar (tiny, base, small, medium, large)
        language: Código de idioma (es para español)
    
    Returns:
        str: Texto transcrito
    """
    try:
        # Cargar el modelo (se descarga automáticamente la primera vez)
        model = whisper.load_model(model_name)
        
        # Transcribir el audio
        result = model.transcribe(audio_path, language=language, task='transcribe')
        
        # Retornar el texto transcrito
        return result['text'].strip()
    
    except Exception as e:
        # Retornar error en formato JSON para que Node.js lo pueda parsear
        error_msg = {
            'error': str(e),
            'type': type(e).__name__
        }
        print(json.dumps(error_msg), file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        error = {'error': 'Uso: python transcribe.py <ruta_audio> [modelo] [idioma]'}
        print(json.dumps(error), file=sys.stderr)
        sys.exit(1)
    
    audio_path = sys.argv[1]
    model_name = sys.argv[2] if len(sys.argv) > 2 else 'base'
    language = sys.argv[3] if len(sys.argv) > 3 else 'es'
    
    # Verificar que el archivo existe
    if not os.path.exists(audio_path):
        error = {'error': f'Archivo no encontrado: {audio_path}'}
        print(json.dumps(error), file=sys.stderr)
        sys.exit(1)
    
    # Transcribir y mostrar resultado
    try:
        text = transcribe_audio(audio_path, model_name, language)
        result = {'text': text, 'success': True}
        print(json.dumps(result))
    except Exception as e:
        error = {'error': str(e), 'success': False}
        print(json.dumps(error), file=sys.stderr)
        sys.exit(1)

