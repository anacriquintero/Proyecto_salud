# Salud Digital APS - Sistema de Gestión

## 📋 Descripción

Sistema de gestión para programas de Atención Primaria en Salud (APS) que optimiza el registro de información clínica y administrativa.

## 🏥 Características Principales

- **Historia Clínica Digital** por especialidades médicas
- **Gestión de Familias y Pacientes** 
- **Recetario Digital** con control de medicamentos
- **Órdenes de Laboratorio** y procedimientos
- **Dashboard Epidemiológico** y reportes
- **Multi-rol** para diferentes profesionales de la salud
- **Interoperabilidad HL7 FHIR** (ver `docs/INTEROPERABILIDAD_FHIR.md`)

## 🗄️ Base de Datos - Estructura Corregida ✅

### 📊 Modelo Hub-and-Spoke Implementado

### 🏗️ Estructura de Tablas

#### **Módulo Común**
- `Roles` - Tipos de usuarios del sistema
- `Equipos_Basicos` - Equipos de salud
- `Usuarios` - Profesionales y personal
- `Familias` - Grupos familiares
- `Pacientes` - Datos de pacientes
- `Planes_Cuidado_Familiar` - Planes de cuidado
- `Demandas_Inducidas` - Necesidades identificadas

#### **Hub Central**
- `Atenciones_Clinicas` - Registro central de atenciones médicas

#### **Spokes Clínicos (Especialidades)**
- `HC_Medicina_General` - Historia clínica medicina general
- `HC_Psicologia` - Historia clínica psicología
- `HC_Fisioterapia` - Historia clínica fisioterapia
- `HC_Nutricion` - Historia clínica nutrición
- `HC_Fonoaudiologia` - Historia clínica fonoaudiología
- `HC_Odontologia` - Historia clínica odontología

#### **Entidades de Salida (CORREGIDAS ✅)**
- `Recetas_Medicas` - **DERIVADA de HC_Medicina_General**
- `Ordenes_Laboratorio` - **DERIVADA de HC_Medicina_General**

## 🔗 Relaciones Corregidas - Implementadas

👥 Roles del Sistema
Médico - Consultas, diagnósticos, tratamientos, recetas, órdenes

Psicólogo - Evaluaciones psicológicas

Fisioterapeuta - Terapias de rehabilitación

Nutricionista - Planes alimentarios

Fonoaudiólogo - Terapias de habla y audición

Odontólogo - Salud oral

Enfermero Jefe - Gestión de cuidados

Auxiliar de Enfermería - Apoyo en cuidados

Administrativo - Gestión administrativa

🚀 Instalación y Ejecución
Backend
bash
cd backend
npm install
npm run dev
<<<<<<< HEAD
Frontend
bash
npm install
npm run dev
🔧 Tecnologías
Frontend: React 18 + TypeScript + Vite + Tailwind CSS
=======
```

#### Variables de entorno
Crea un archivo `.env` en `backend/` con:

```env
# API Key de ElevenLabs para Speech-to-Text y Text-to-Speech
ELEVENLABS_API_KEY=tu_api_key_de_elevenlabs

# API Key de Apitude para consultar ADRES/BDUA (opcional)
# Obtén tu API key en: https://apitude.co
# Cuando tengas acceso, agrega:
# APITUDE_API_KEY=tu_api_key_aqui
```

Endpoint TTS: `POST http://localhost:3001/api/tts` con body `{ "texto": "Hola" }` devuelve `audio/mpeg`.

### Speech-to-Text (STT)
- Endpoint: `POST http://localhost:3001/api/stt`
- Enviar `multipart/form-data` con el campo `audio` (ej. `audio/webm` del navegador)
- Respuesta: JSON con `{ text: "..." }`

### Consulta ADRES (Base de Datos Única de Afiliados)
- **Integración con Apitude**: El sistema está preparado para consultar datos de pacientes desde ADRES
- **Endpoint**: `GET http://localhost:3001/api/pacientes/consultar-adres/:numero_documento?tipo_documento=CC`
- **Estado**: ✅ Implementado y listo para usar cuando tengas credenciales
- **Configuración**: 
  1. Obtén una API key de Apitude (https://apitude.co)
  2. Agrega `APITUDE_API_KEY=tu_api_key` en `backend/.env`
  3. Reinicia el servidor backend
- **Nota**: Si no hay API key configurada, el sistema mostrará un mensaje informativo y permitirá ingresar los datos manualmente
>>>>>>> 104f43e (feat(IA): TTS y STT con ElevenLabs + UI médico)

Backend: Node.js + Express + SQLite

Base de Datos: SQLite con 16 tablas

Herramientas: DBeaver para gestión de BD

📊 Estado del Proyecto
✅ Completado
Estructura de base de datos completa (16 tablas)

Relaciones corregidas entre entidades clínicas

Modelo Hub-and-Spoke implementado

Tablas derivadas correctamente asociadas

Campos requeridos para sistema médico

Base de datos validada y funcionando
