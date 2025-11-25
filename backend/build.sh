#!/bin/bash
# Script de build para Render - Instala dependencias de Node.js y Python (Whisper)

set -e

echo "🔧 Instalando dependencias de Node.js..."
npm install

echo "🐍 Verificando Python..."
python3 --version || python --version

echo "📦 Instalando dependencias de Python para Whisper..."
cd integrations/whisper_stt
pip3 install -r requirements.txt || pip install -r requirements.txt
cd ../..

echo "✅ Build completado"

