# APS - Sistema de Registro Clínico

Plataforma de Atención Primaria en Salud (APS) para registro clínico y gestión de pacientes.

## 🏥 Descripción

Sistema web diseñado para profesionales de la salud que permite:

- Registro y gestión de familias y pacientes
- Historia clínica digital
- Consultas médicas especializadas
- Recetario digital
- Órdenes de exámenes
- Dashboard epidemiológico
- Reportes y estadísticas

## 👥 Roles de Usuario

El sistema soporta los siguientes roles profesionales:

- **Médico**: Consultas médicas, diagnósticos, tratamientos
- **Psicólogo**: Evaluaciones psicológicas, terapias
- **Fisioterapeuta**: Terapias físicas, rehabilitación
- **Nutricionista**: Evaluación nutricional, planes alimentarios
- **Fonoaudiólogo**: Terapias del habla y audición
- **Odontólogo**: Consultas odontológicas
- **Enfermero Jefe**: Gestión de enfermería, planes de cuidado
- **Auxiliar de Enfermería**: Apoyo en cuidados de enfermería
- **Administrativo**: Gestión de citas, reportes administrativos
- **Ente de Salud Pública**: Dashboard epidemiológico, supervisión

## 🚀 Tecnologías

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Database**: Supabase (configuración pendiente)

## 📱 Características

- **Responsive Design**: Optimizado para móvil, tablet y desktop
- **Autenticación**: Sistema de login por roles
- **Offline Support**: Funcionalidad sin conexión
- **PWA Ready**: Preparado para Progressive Web App

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/MafeTello/APS_uao.git

# Navegar al directorio
cd APS_uao

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linter ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── LoginForm.tsx   # Formulario de autenticación
│   ├── ProtectedRoute.tsx # Control de acceso
│   └── UserProfile.tsx # Perfil de usuario
├── hooks/              # Custom hooks
│   └── useAuth.ts     # Hook de autenticación
├── services/           # Servicios y APIs
│   └── authService.ts # Servicio de autenticación
├── types/              # Definiciones TypeScript
│   └── auth.ts        # Tipos de autenticación
└── App.tsx            # Componente principal
```

## 🔐 Autenticación

El sistema utiliza autenticación basada en roles con sesiones persistentes. Cada rol tiene acceso a funcionalidades específicas según su perfil profesional.

## 🎨 Diseño

- **Design System**: Basado en principios de Material Design
- **Colores**: Paleta centrada en verde esmeralda para salud
- **Tipografía**: Sistema tipográfico escalable
- **Espaciado**: Sistema de espaciado de 8px

## 📊 Estado del Proyecto

- ✅ Sistema de autenticación
- ✅ Interfaces por rol
- ✅ Diseño responsive
- 🔄 Integración con base de datos (en progreso)
- 🔄 Funcionalidades offline (en progreso)
- 🔄 PWA (pendiente)

## 🤝 Contribución

Este proyecto es parte del programa de Atención Primaria en Salud de la UAO.

## 📄 Licencia

Proyecto académico - Universidad Autónoma de Occidente

---

Desarrollado con ❤️ para mejorar la atención primaria en salud