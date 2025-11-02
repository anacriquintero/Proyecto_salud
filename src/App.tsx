import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { LoginForm } from "./components/LoginForm";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserProfile } from "./components/UserProfile";
import { 
  User, 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  Search, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Stethoscope,
  Brain,
  Dumbbell,
  Apple,
  Ear,
  Smile,
  Shield,
  UserCheck,
  Building2,
  Eye,
  ChevronRight,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Menu,
  X,
  Phone,
  MapPin,
  Camera,
  Mic,
  Save,
  Send,
  Home,
  ChevronDown,
  Filter,
  Bell,
  Wifi,
  WifiOff,
  ClipboardList,
  Heart,
  Briefcase,
  TrendingUp,
  AlertCircle,
  Download,
  Upload,
  Calendar as CalendarIcon,
  UserPlus,
  FileCheck,
  Target,
  Globe,
  LogOut
} from "lucide-react";
import { AuthService } from "./services/authService";

// Configuración completa de todos los roles de usuario
export const USER_ROLES = {
  medico: {
    name: "Médico",
    icon: Stethoscope,
    color: "emerald",
    mainSections: [
      { key: "crear-familia", label: "Crear Familia", icon: Users },
      { key: "familias", label: "Familias", icon: Users },
      { key: "consultas-asignadas", label: "Consultas Asignadas", icon: Calendar },
      { key: "consultas-realizadas", label: "Consultas Realizadas", icon: CheckCircle },
      { key: "bitacora", label: "Bitácora", icon: Activity }
    ],
    sidebarSections: [
      { key: "bd-pacientes", label: "BD Pacientes", icon: Search },
      { key: "dashboard-epidemio", label: "Dashboard", icon: BarChart3 },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  },
  psicologo: {
    name: "Psicólogo",
    icon: Brain,
    color: "emerald",
    mainSections: [
      { key: "crear-familia", label: "Crear Familia", icon: Users },
      { key: "consultas-asignadas", label: "Consultas Asignadas", icon: Calendar },
      { key: "consultas-realizadas", label: "Consultas Realizadas", icon: CheckCircle },
      { key: "educacion-salud", label: "Educación en Salud", icon: FileText },
      { key: "bitacora", label: "Bitácora", icon: Activity }
    ],
    sidebarSections: [
      { key: "bd-pacientes", label: "BD Pacientes", icon: Search },
      { key: "dashboard-psicologia", label: "Dashboard", icon: BarChart3 },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  },
  fisioterapeuta: {
    name: "Fisioterapeuta",
    icon: Dumbbell,
    color: "emerald",
    mainSections: [
      { key: "crear-familia", label: "Crear Familia", icon: Users },
      { key: "terapias-asignadas", label: "Terapias Asignadas", icon: Calendar },
      { key: "terapias-realizadas", label: "Terapias Realizadas", icon: CheckCircle },
      { key: "educacion-salud", label: "Educación en Salud", icon: FileText },
      { key: "bitacora", label: "Bitácora", icon: Activity }
    ],
    sidebarSections: [
      { key: "bd-pacientes", label: "BD Pacientes", icon: Search },
      { key: "dashboard-fisioterapia", label: "Dashboard", icon: BarChart3 },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  },
  nutricionista: {
    name: "Nutricionista",
    icon: Apple,
    color: "emerald",
    mainSections: [
      { key: "crear-familia", label: "Crear Familia", icon: Users },
      { key: "consultas-asignadas", label: "Consultas Asignadas", icon: Calendar },
      { key: "consultas-realizadas", label: "Consultas Realizadas", icon: CheckCircle },
      { key: "educacion-salud", label: "Educación en Salud", icon: FileText },
      { key: "bitacora", label: "Bitácora", icon: Activity }
    ],
    sidebarSections: [
      { key: "bd-pacientes", label: "BD Pacientes", icon: Search },
      { key: "dashboard-nutricion", label: "Dashboard", icon: BarChart3 },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  },
  fonoaudiologo: {
    name: "Fonoaudiólogo",
    icon: Ear,
    color: "emerald",
    mainSections: [
      { key: "consultas-asignadas", label: "Consultas Asignadas", icon: Calendar },
      { key: "consultas-realizadas", label: "Consultas Realizadas", icon: CheckCircle },
      { key: "educacion-salud", label: "Educación en Salud", icon: FileText },
      { key: "bitacora", label: "Bitácora", icon: Activity }
    ],
    sidebarSections: [
      { key: "bd-pacientes", label: "BD Pacientes", icon: Search },
      { key: "dashboard-fonoaudiologia", label: "Dashboard", icon: BarChart3 },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  },
  odontologo: {
    name: "Odontólogo",
    icon: Smile,
    color: "emerald",
    mainSections: [
      { key: "consultas-asignadas", label: "Consultas Asignadas", icon: Calendar },
      { key: "consultas-realizadas", label: "Consultas Realizadas", icon: CheckCircle },
      { key: "educacion-salud", label: "Educación en Salud", icon: FileText },
      { key: "bitacora", label: "Bitácora", icon: Activity }
    ],
    sidebarSections: [
      { key: "bd-pacientes", label: "BD Pacientes", icon: Search },
      { key: "dashboard-odontologia", label: "Dashboard", icon: BarChart3 },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  },
  enfermero_jefe: {
    name: "Enfermero Jefe",
    icon: Shield,
    color: "emerald",
    mainSections: [
      { key: "crear-familia", label: "Crear Familia", icon: Users },
      { key: "caracterizaciones", label: "Caracterizaciones", icon: FileText },
      { key: "planes-cuidado", label: "Planes de Cuidado", icon: Activity },
      { key: "consultas-asignadas", label: "Consultas", icon: Calendar },
      { key: "bitacora", label: "Bitácora", icon: Activity }
    ],
    sidebarSections: [
      { key: "bd-pacientes", label: "BD Pacientes", icon: Search },
      { key: "dashboard-enfermeria", label: "Dashboard", icon: BarChart3 },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  },
  auxiliar_enfermeria: {
    name: "Auxiliar de Enfermería",
    icon: UserCheck,
    color: "emerald",
    mainSections: [
      { key: "crear-familia", label: "Crear Familia", icon: Users },
      { key: "caracterizaciones", label: "Caracterizaciones", icon: FileText },
      { key: "planes-cuidado", label: "Planes de Cuidado", icon: Heart },
      { key: "bitacora", label: "Bitácora", icon: Activity }
    ],
    sidebarSections: [
      { key: "bd-pacientes", label: "BD Pacientes", icon: Search },
      { key: "dashboard-auxiliar", label: "Dashboard", icon: BarChart3 },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  },
  administrativo: {
    name: "Administrativo",
    icon: Briefcase,
    color: "emerald",
    mainSections: [
      { key: "gestion-citas", label: "Gestión de Citas", icon: CalendarIcon },
      { key: "reportes-admin", label: "Reportes", icon: BarChart3 },
      { key: "validacion-registros", label: "Validación", icon: FileCheck },
      { key: "bitacora", label: "Bitácora", icon: Activity }
    ],
    sidebarSections: [
      { key: "bd-pacientes", label: "BD Pacientes", icon: Search },
      { key: "dashboard-admin", label: "Dashboard", icon: TrendingUp },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  },
  ente_salud_publica: {
    name: "Ente de Salud Pública",
    icon: Globe,
    color: "emerald",
    mainSections: [
      { key: "dashboard-epidemio", label: "Dashboard Epidemiológico", icon: TrendingUp },
      { key: "reportes-publicos", label: "Reportes", icon: BarChart3 },
      { key: "alertas-epidemio", label: "Alertas", icon: AlertCircle },
      { key: "supervision-coberturas", label: "Supervisión", icon: Target }
    ],
    sidebarSections: [
      { key: "bd-pacientes-agregada", label: "BD Agregada", icon: Search },
      { key: "panel-nacional", label: "Panel Nacional", icon: Globe },
      { key: "configuracion", label: "Configuración", icon: Settings },
      { key: "ayuda", label: "Ayuda", icon: HelpCircle }
    ]
  }
};

// Hook para detectar el tipo de dispositivo
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(() => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  });
  
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType('mobile');
      else if (width < 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return deviceType;
};

// Componentes base responsivos
const ResponsiveCard = ({ children, className = "" }: any) => (
  <div className={`bg-white rounded-2xl shadow-soft border border-sinbad-300 p-4 md:p-6 ${className}`}>
    {children}
  </div>
);

const ResponsiveField = ({ label, children, required = false, hint }: any) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-eden-700">
      {label} {required && <span className="text-eden-600">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-eden-500">{hint}</p>}
  </div>
);

const ResponsiveInput = (props: any) => (
  <input
    {...props}
    className={`w-full px-3 py-2 md:py-3 border border-sinbad-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm md:text-base transition-colors ${props.className || ""}`}
  />
);

const ResponsiveSelect = ({ options = [], ...rest }: any) => (
  <select
    {...rest}
    className="w-full px-3 py-2 md:py-3 border border-sinbad-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm md:text-base bg-white transition-colors"
  >
    {options.map((o: any) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

const ResponsiveBadge = ({ children, tone = "stone" }: { children: React.ReactNode; tone?: string }) => {
  const colors = {
    // Badges funcionales por tipo de información
    health: "border-bondi-200 text-bondi-700 bg-bondi-50", // Información de salud
    admin: "border-san-marino text-san-marino bg-san-marino-50", // Información administrativa
    data: "border-eden-200 text-eden-700 bg-eden-50", // Información de datos
    warning: "border-janna-300 text-eden-800 bg-janna-100", // Advertencias
    neutral: "border-sinbad-300 text-sinbad-700 bg-sinbad-100", // Información neutra
    
    // Mantener compatibilidad con nombres anteriores
    green: "border-bondi-200 text-bondi-700 bg-bondi-50",
    amber: "border-janna-300 text-eden-800 bg-janna-100",
    rose: "border-eden-200 text-eden-700 bg-eden-50",
    blue: "border-san-marino text-san-marino bg-san-marino-50",
    stone: "border-sinbad-300 text-sinbad-700 bg-sinbad-100",
    bondi: "border-bondi-200 text-bondi-700 bg-bondi-50",
    marino: "border-san-marino text-san-marino bg-san-marino-50",
    eden: "border-eden-200 text-eden-700 bg-eden-50",
    sinbad: "border-sinbad-300 text-sinbad-700 bg-sinbad-100",
    janna: "border-janna-300 text-eden-800 bg-janna-100"
  };
  
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs border font-medium ${colors[tone] || colors.stone}`}>
      {children}
    </span>
  );
};

const ResponsiveButton = ({ children, variant = "primary", size = "md", className = "", ...props }: {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
  [key: string]: any;
}) => {
  const variants = {
    primary: "bg-bondi-blue text-white hover:bg-bondi-600 shadow-soft", // Salud y acciones principales
    secondary: "bg-janna-100 text-eden-700 hover:bg-janna-200 border border-janna-300", // Alertas y advertencias
    outline: "border border-eden-200 text-eden-700 hover:bg-sinbad-50 hover:border-san-marino", // Datos y contenido
    success: "bg-bondi-blue text-white hover:bg-bondi-600 shadow-soft", // Confirmaciones de salud
    warning: "bg-janna-500 text-eden-800 hover:bg-janna-600 shadow-soft", // Advertencias
    danger: "bg-eden-600 text-white hover:bg-eden-700 shadow-soft", // Datos críticos
    admin: "bg-san-marino text-white hover:bg-san-marino-600 shadow-soft", // Navegación y administración
    info: "bg-sinbad-600 text-eden-800 hover:bg-sinbad-700 shadow-soft" // Información general
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 md:py-3 text-sm md:text-base",
    lg: "px-6 py-3 md:py-4 text-base md:text-lg"
  };
  
  return (
    <button
      {...props}
      className={`rounded-xl font-medium transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Componente de navegación móvil
const MobileNavItem = ({ label, icon: Icon, active, onClick, badge }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
      active 
        ? "bg-san-marino-50 text-san-marino-700 border border-san-marino-200 shadow-soft" 
        : "text-eden-600 hover:bg-sinbad-50 hover:text-san-marino-700"
    }`}
  >
    <Icon className="w-5 h-5 flex-shrink-0" />
    <span className="font-medium flex-1 text-sm">{label}</span>
    {badge && (
      <span className="bg-janna-200 text-eden-800 text-xs px-2 py-1 rounded-full min-w-[20px] text-center font-medium">
        {badge}
      </span>
    )}
  </button>
);

// Vistas principales
function InicioView({ currentRole, deviceType, onNavigate }: any) {
  const roleConfig = USER_ROLES[currentRole];
  const [isOnline, setIsOnline] = useState(false);
  const [ttsText, setTtsText] = useState("");
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);
  const [transcript, setTranscript] = useState<string>("");
  const [kpis, setKpis] = useState([
    { label: "Registros hoy", value: 0, icon: FileText },
    { label: "Consultas", value: 0, icon: Calendar },
    { label: "Caracterizaciones", value: 0, icon: Users },
    { label: "Demandas inducidas", value: 0, icon: Target },
  ]);
  const [kpisLoading, setKpisLoading] = useState(true);

  useEffect(() => {
    const loadResumen = async () => {
      try {
        setKpisLoading(true);
        const user = AuthService.getCurrentUser();
        if (user?.id) {
          const resumen = await AuthService.getResumenActividad(Number(user.id));
          setKpis([
            { label: "Registros hoy", value: resumen.registros_hoy || 0, icon: FileText },
            { label: "Consultas", value: resumen.consultas || 0, icon: Calendar },
            { label: "Caracterizaciones", value: resumen.caracterizaciones || 0, icon: Users },
            { label: "Demandas inducidas", value: resumen.demandas_inducidas || 0, icon: Target },
          ]);
        }
      } catch (error) {
        console.error('Error cargando resumen de actividad:', error);
      } finally {
        setKpisLoading(false);
      }
    };

    loadResumen();
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Estado de conexión */}
      <ResponsiveCard className="bg-gradient-to-r from-sinbad-100 to-janna-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOnline ? <Wifi className="w-4 h-4 text-bondi-blue" /> : <WifiOff className="w-4 h-4 text-janna-600" />}
            <span className="text-sm font-medium text-eden-700">
              {isOnline ? "En línea" : "Sin conexión"}
            </span>
          </div>
          <ResponsiveBadge tone={isOnline ? "health" : "warning"}>
            {isOnline ? "Sincronizado" : "3 pendientes"}
          </ResponsiveBadge>
        </div>
      </ResponsiveCard>

      {/* KPIs */}
      <ResponsiveCard>
        <h3 className="font-semibold text-eden-800 mb-4">Resumen de actividad</h3>
        {kpisLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-sinbad-100 rounded-xl p-3 md:p-4 border border-sinbad-300 animate-pulse">
                <div className="h-4 bg-sinbad-200 rounded mb-2"></div>
                <div className="h-8 bg-sinbad-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-3 ${
            deviceType === 'mobile' ? 'grid-cols-2' : 
            deviceType === 'tablet' ? 'grid-cols-2 md:grid-cols-4' : 
            'grid-cols-4'
          }`}>
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className="bg-sinbad-100 rounded-xl p-3 md:p-4 border border-sinbad-300 hover:shadow-soft transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-eden-600" />
                    <div className="text-xs text-eden-600">{kpi.label}</div>
                  </div>
                  <div className="text-xl md:text-2xl font-semibold text-eden-800">{kpi.value}</div>
                </div>
              );
            })}
          </div>
        )}
      </ResponsiveCard>

      {/* Herramienta IA: Texto a voz (Médico / Psicólogo) */}
      {['medico','psicologo'].includes(currentRole) && (
        <ResponsiveCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-eden-800">Asistente de voz (ElevenLabs)</h3>
            <ResponsiveBadge tone="info">TTS</ResponsiveBadge>
          </div>
          <div className={`grid gap-3 ${deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-6'}`}>
            <div className={deviceType === 'mobile' ? '' : 'col-span-5'}>
              <ResponsiveField label="Texto a convertir a voz">
                <ResponsiveInput
                  placeholder="Ej: Paciente con dolor torácico de 2 días de evolución..."
                  value={ttsText}
                  onChange={(e: any) => setTtsText(e.target.value)}
                />
              </ResponsiveField>
            </div>
            <div className="flex items-end">
              <ResponsiveButton
                onClick={async () => {
                  if (!ttsText || isTtsLoading) return;
                  try {
                    setIsTtsLoading(true);
                    setAudioUrl(null);
                    const resp = await fetch('http://localhost:3001/api/tts', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ texto: ttsText })
                    });
                    if (!resp.ok) {
                      const err = await resp.json().catch(() => ({}));
                      throw new Error(err?.error || 'Error generando voz');
                    }
                    const blob = await resp.blob();
                    const url = URL.createObjectURL(blob);
                    setAudioUrl(url);
                    setTimeout(() => {
                      if (audioRef.current) {
                        audioRef.current.play().catch(() => {});
                      }
                    }, 50);
                  } catch (e) {
                    console.error('TTS error:', e);
                    alert(e instanceof Error ? e.message : 'Error generando voz');
                  } finally {
                    setIsTtsLoading(false);
                  }
                }}
                variant="primary"
                className="w-full"
                disabled={!ttsText || isTtsLoading}
              >
                {isTtsLoading ? 'Generando...' : 'Generar voz'}
              </ResponsiveButton>
            </div>
          </div>
          {audioUrl && (
            <div className="mt-3">
              <audio ref={audioRef} src={audioUrl} controls className="w-full" />
            </div>
          )}
        </ResponsiveCard>
      )}

      {/* Herramienta IA: Voz a texto (Médico / Psicólogo) */}
      {['medico','psicologo'].includes(currentRole) && (
        <ResponsiveCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-eden-800">Dictado médico (STT)</h3>
            <ResponsiveBadge tone="info">STT</ResponsiveBadge>
          </div>
          <div className="flex items-center gap-3">
            <ResponsiveButton
              variant={isRecording ? 'warning' : 'primary'}
              onClick={async () => {
                try {
                  if (!isRecording) {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    const mr = new MediaRecorder(stream);
                    audioChunksRef.current = [];
                    mr.ondataavailable = (e: BlobEvent) => {
                      if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
                    };
                    mr.onstop = async () => {
                      try {
                        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                        // Convertir a mp3 puede no ser posible en navegador; ElevenLabs acepta varios formatos.
                        const form = new FormData();
                        form.append('audio', blob, 'audio.webm');
                        const resp = await fetch('http://localhost:3001/api/stt', { method: 'POST', body: form });
                        if (!resp.ok) {
                          let msg = 'Error transcribiendo audio';
                          try {
                            const err = await resp.json();
                            msg = `${err?.error || msg}${err?.status ? ` (status ${err.status})` : ''}${err?.details ? `: ${err.details}` : ''}`;
                          } catch {}
                          throw new Error(msg);
                        }
                        const data = await resp.json();
                        setTranscript(typeof data?.text === 'string' ? data.text : JSON.stringify(data));
                      } catch (e) {
                        console.error('STT error:', e);
                        alert(e instanceof Error ? e.message : 'Error transcribiendo audio');
                      }
                    };
                    mediaRecorderRef.current = mr;
                    mr.start();
                    setIsRecording(true);
                  } else {
                    mediaRecorderRef.current?.stop();
                    setIsRecording(false);
                  }
                } catch (e) {
                  console.error('Mic error:', e);
                  alert('No se pudo acceder al micrófono');
                }
              }}
            >
              {isRecording ? 'Detener' : 'Grabar dictado'}
            </ResponsiveButton>
          </div>
          {transcript && (
            <div className="mt-3">
              <ResponsiveField label="Transcripción">
                <textarea className="w-full px-3 py-2 border border-sinbad-300 rounded-xl text-sm" rows={3} value={transcript} onChange={(e) => setTranscript(e.target.value)} />
              </ResponsiveField>
            </div>
          )}
        </ResponsiveCard>
      )}

      {/* Acciones rápidas */}
      <ResponsiveCard>
        <h3 className="font-semibold text-eden-800 mb-4">Acciones rápidas</h3>
        <div className={`grid gap-3 ${
          deviceType === 'mobile' ? 'grid-cols-2' : 
          deviceType === 'tablet' ? 'grid-cols-3' : 
          'grid-cols-6'
        }`}>
          {roleConfig.mainSections.slice(0, 6).map((section) => {
            const Icon = section.icon;
            return (
              <ResponsiveButton
                key={section.key}
                variant="secondary"
                onClick={() => onNavigate && onNavigate(section.key)}
                className="flex flex-col items-center gap-2 h-16 md:h-20 hover:shadow-soft"
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs">{section.label.split(' ')[0]}</span>
              </ResponsiveButton>
            );
          })}
        </div>
      </ResponsiveCard>

      {/* Próximas citas - Solo en desktop y tablet */}
      {deviceType !== 'mobile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <ResponsiveCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-eden-800">Próximas citas</h3>
              <ResponsiveBadge tone="bondi">3</ResponsiveBadge>
            </div>
            <div className="space-y-3">
              {[
                { nombre: "María González", hora: "09:30", tipo: "Control" },
                { nombre: "Carlos Rodríguez", hora: "10:15", tipo: "Primera vez" },
                { nombre: "Ana Martínez", hora: "11:00", tipo: "Seguimiento" }
              ].map((cita, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-sinbad-50 rounded-lg border border-sinbad-200 hover:shadow-soft transition-all">
                  <div>
                    <div className="font-medium text-eden-800 text-sm">{cita.nombre}</div>
                    <div className="text-xs text-eden-600">{cita.tipo}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-eden-800 text-sm">{cita.hora}</div>
                    <ResponsiveBadge tone="health">Confirmada</ResponsiveBadge>
                  </div>
                </div>
              ))}
            </div>
          </ResponsiveCard>

          <ResponsiveCard>
            <h3 className="font-semibold text-eden-800 mb-4">Alertas del sistema</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-janna-100 rounded-lg border border-janna-200">
                <AlertTriangle className="w-5 h-5 text-janna-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-eden-800">Campos incompletos</div>
                  <div className="text-xs text-eden-600">HC: antecedentes familiares</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-bondi-50 rounded-lg border border-bondi-200">
                <CheckCircle className="w-5 h-5 text-bondi-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-bondi-800">Exportación exitosa</div>
                  <div className="text-xs text-bondi-600">Última exportación RIPS</div>
                </div>
              </div>
            </div>
          </ResponsiveCard>
        </div>
      )}
    </div>
  );
}

function FamiliasView({ deviceType }: any) {
  const [familias, setFamilias] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMunicipio, setFilterMunicipio] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await AuthService.getFamilias();
        if (isMounted) setFamilias(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (isMounted) setError(e?.message || 'Error cargando familias');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-eden-800">Familias</h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-sinbad-200 hover:bg-sinbad-50 hover:border-san-marino transition-all">
              <Filter className="w-4 h-4 text-eden-600" />
            </button>
            <button className="p-2 rounded-lg border border-sinbad-200 hover:bg-sinbad-50 hover:border-san-marino transition-all">
              <Search className="w-4 h-4 text-eden-600" />
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-sm text-eden-500">Cargando familias...</div>
        )}
        {error && (
          <div className="text-sm text-eden-600">{error}</div>
        )}

        {!isLoading && !error && (
          <div className="space-y-3">
            <div className={`grid gap-3 ${deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'}`}>
              <ResponsiveField label="Buscar por apellido">
                <ResponsiveInput
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                  placeholder="Ej: García"
                />
              </ResponsiveField>
              <ResponsiveField label="Filtrar por municipio">
                <ResponsiveInput
                  value={filterMunicipio}
                  onChange={(e: any) => setFilterMunicipio(e.target.value)}
                  placeholder="Ej: Cali"
                />
              </ResponsiveField>
            </div>
            {familias.length === 0 && (
              <div className="text-sm text-eden-500">No hay familias registradas.</div>
            )}
            {familias
              .filter((f: any) =>
                (!searchTerm || (f.apellido_principal || '').toLowerCase().includes(searchTerm.toLowerCase())) &&
                (!filterMunicipio || (f.municipio || '').toLowerCase().includes(filterMunicipio.toLowerCase()))
              )
              .map((fam: any) => (
              <button
                key={fam.familia_id}
                onClick={() => {
                  // Señal al contenedor principal mediante evento custom
                  const ev: any = new CustomEvent('openFamiliaDetalle', { detail: fam });
                  window.dispatchEvent(ev);
                }}
                className="w-full p-4 bg-sinbad-50 rounded-xl text-left hover:bg-sinbad-100 hover:shadow-soft transition-all border border-sinbad-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-eden-800">{fam.apellido_principal}</h4>
                      {typeof fam.integrantes_count === 'number' && (
                        <ResponsiveBadge tone="admin">{fam.integrantes_count}</ResponsiveBadge>
                      )}
                    </div>
                    <p className="text-sm text-eden-600 mb-2">
                      {fam.direccion} • {fam.barrio_vereda || fam.municipio}
                    </p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-eden-400" />
                      <span className="text-sm text-eden-600">{fam.municipio}</span>
                      {fam.telefono_contacto && (
                        <>
                          <span className="text-eden-300">•</span>
                          <Phone className="w-4 h-4 text-eden-400" />
                          <span className="text-sm text-eden-600">{fam.telefono_contacto}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-eden-400" />
                </div>
              </button>
            ))}
          </div>
        )}
      </ResponsiveCard>
    </div>
  );
}

// Vista: Detalle de Familia
function DetalleFamiliaView({ familia, onBack, onShowCaracterizacion, onShowPaciente }: {
  familia: any;
  onBack: () => void;
  onShowCaracterizacion: (familia: any, caracterizacion: any) => void;
  onShowPaciente: (paciente: any, familia: any) => void;
}) {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [caracterizacion, setCaracterizacion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>({
    tipo_documento: 'CC',
    numero_documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    genero: 'M',
    telefono: '',
    email: ''
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [pacientesData, caracterizacionData] = await Promise.all([
        AuthService.getPacientesByFamilia(familia.familia_id),
        AuthService.getCaracterizacionFamilia(familia.familia_id)
      ]);
      setPacientes(pacientesData);
      setCaracterizacion(caracterizacionData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [familia?.familia_id]);

  const handleCreate = async () => {
    await AuthService.crearPaciente({
      familia_id: familia.familia_id,
      tipo_documento: form.tipo_documento,
      numero_documento: form.numero_documento,
      primer_nombre: form.primer_nombre,
      segundo_nombre: form.segundo_nombre || null,
      primer_apellido: form.primer_apellido,
      segundo_apellido: form.segundo_apellido || null,
      fecha_nacimiento: form.fecha_nacimiento || null,
      genero: form.genero || null,
      telefono: form.telefono || null,
      email: form.email || null
    });
    setShowForm(false);
    await loadData();
  };

  const handleShowCaracterizacion = () => {
    if (onShowCaracterizacion) {
      onShowCaracterizacion(familia, caracterizacion);
    }
  };

  const handleShowPaciente = (paciente: any) => {
    if (onShowPaciente) {
      onShowPaciente(paciente, familia);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <ResponsiveCard>
          <div className="text-center py-8">
            <div className="text-sm text-stone-500">Cargando datos de la familia...</div>
          </div>
        </ResponsiveCard>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-stone-900">Familia {familia.apellido_principal}</h3>
            <div className="text-sm text-stone-600">{familia.direccion} • {familia.municipio}</div>
            {caracterizacion?.familia?.fecha_caracterizacion && (
              <div className="text-xs text-bondi-600 mt-1">
                Caracterizada el {new Date(caracterizacion.familia.fecha_caracterizacion).toLocaleDateString()}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <ResponsiveButton variant="secondary" onClick={onBack}>Volver</ResponsiveButton>
            <ResponsiveButton variant="admin" onClick={handleShowCaracterizacion}>
              {caracterizacion?.tiene_caracterizacion ? 'Editar Caracterización' : 'Realizar Caracterización'}
            </ResponsiveButton>
            <ResponsiveButton onClick={() => setShowForm(true)}>Agregar Paciente</ResponsiveButton>
          </div>
        </div>
      </ResponsiveCard>

      {/* Información de caracterización familiar si existe */}
      {caracterizacion?.tiene_caracterizacion && (
        <ResponsiveCard>
          <h4 className="font-semibold text-stone-900 mb-3">Información de Caracterización</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-stone-500">Tipo de Familia</div>
              <div className="text-sm font-medium text-stone-900">
                {caracterizacion.familia.tipo_familia || 'No especificado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Zona</div>
              <div className="text-sm font-medium text-stone-900">
                {caracterizacion.familia.zona || 'No especificado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Estrato</div>
              <div className="text-sm font-medium text-stone-900">
                {caracterizacion.familia.estrato || 'No especificado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Territorio</div>
              <div className="text-sm font-medium text-stone-900">
                {caracterizacion.familia.territorio || 'No especificado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Riesgo Familiar</div>
              <div className="text-sm font-medium text-stone-900">
                {caracterizacion.familia.riesgo_familiar || 'No evaluado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Nº Ficha</div>
              <div className="text-sm font-medium text-stone-900">
                {caracterizacion.familia.numero_ficha || 'No asignado'}
              </div>
            </div>
          </div>
        </ResponsiveCard>
      )}

      <ResponsiveCard>
        <h4 className="font-semibold text-stone-900 mb-3">Integrantes</h4>
        {pacientes.length === 0 ? (
          <div className="text-sm text-stone-500">No hay pacientes en esta familia.</div>
        ) : (
          <div className="space-y-2">
            {pacientes.map((p: any) => (
              <button
                key={p.paciente_id}
                onClick={() => handleShowPaciente(p)}
                className="w-full p-3 bg-stone-50 rounded-lg flex items-center justify-between hover:bg-stone-100 transition-colors text-left"
              >
                <div>
                  <div className="font-medium text-stone-900 text-sm">
                    {p.primer_nombre} {p.segundo_nombre} {p.primer_apellido} {p.segundo_apellido}
                  </div>
                  <div className="text-xs text-stone-500">{p.tipo_documento} {p.numero_documento}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </div>
        )}
      </ResponsiveCard>

      {showForm && (
        <ResponsiveCard>
          <h4 className="font-semibold text-stone-900 mb-3">Nuevo Paciente</h4>
          <div className={`grid gap-3 ${'grid-cols-1 md:grid-cols-2'}`}>
            <ResponsiveField label="Tipo documento">
              <ResponsiveSelect value={form.tipo_documento} onChange={(e: any) => setForm({ ...form, tipo_documento: e.target.value })}
                options={[{value:'CC',label:'CC'},{value:'TI',label:'TI'},{value:'CE',label:'CE'}]} />
            </ResponsiveField>
            <ResponsiveField label="Número documento">
              <ResponsiveInput value={form.numero_documento} onChange={(e: any) => setForm({ ...form, numero_documento: e.target.value })} />
            </ResponsiveField>
            <ResponsiveField label="Primer nombre">
              <ResponsiveInput value={form.primer_nombre} onChange={(e: any) => setForm({ ...form, primer_nombre: e.target.value })} />
            </ResponsiveField>
            <ResponsiveField label="Segundo nombre">
              <ResponsiveInput value={form.segundo_nombre} onChange={(e: any) => setForm({ ...form, segundo_nombre: e.target.value })} />
            </ResponsiveField>
            <ResponsiveField label="Primer apellido">
              <ResponsiveInput value={form.primer_apellido} onChange={(e: any) => setForm({ ...form, primer_apellido: e.target.value })} />
            </ResponsiveField>
            <ResponsiveField label="Segundo apellido">
              <ResponsiveInput value={form.segundo_apellido} onChange={(e: any) => setForm({ ...form, segundo_apellido: e.target.value })} />
            </ResponsiveField>
            <ResponsiveField label="Fecha nacimiento">
              <ResponsiveInput type="date" value={form.fecha_nacimiento} onChange={(e: any) => setForm({ ...form, fecha_nacimiento: e.target.value })} />
            </ResponsiveField>
            <ResponsiveField label="Género">
              <ResponsiveSelect value={form.genero} onChange={(e: any) => setForm({ ...form, genero: e.target.value })}
                options={[{value:'M',label:'Masculino'},{value:'F',label:'Femenino'}]} />
            </ResponsiveField>
            <ResponsiveField label="Teléfono">
              <ResponsiveInput value={form.telefono} onChange={(e: any) => setForm({ ...form, telefono: e.target.value })} />
            </ResponsiveField>
            <ResponsiveField label="Email">
              <ResponsiveInput value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} />
            </ResponsiveField>
          </div>
          <div className="flex gap-3 pt-4">
            <ResponsiveButton variant="secondary" onClick={() => setShowForm(false)}>Cancelar</ResponsiveButton>
            <ResponsiveButton onClick={handleCreate}>Guardar Paciente</ResponsiveButton>
          </div>
        </ResponsiveCard>
      )}
    </div>
  );
}

// Vista: Detalle del Paciente
function DetallePacienteView({ paciente, familia, caracterizacion, onBack }: any) {
  const { user } = useAuth();
  const isAuxiliar = (user?.role === 'auxiliar_enfermeria');
  const isMedico = (user?.role === 'medico');
  const canCreatePlanOrDemanda = isAuxiliar || isMedico;
  const [pacienteData, setPacienteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [caracterizacionData, setCaracterizacionData] = useState<any>(null);

  useEffect(() => {
    const loadCaracterizacion = async () => {
      try {
        // Cargar caracterización de la familia para obtener datos individuales del paciente
        const data = await AuthService.getCaracterizacionFamilia(familia.familia_id);
        setCaracterizacionData(data);
        
        // Buscar los datos de caracterización del paciente específico
        if (data?.integrantes) {
          const pacienteConCaracterizacion = data.integrantes.find(
            (p: any) => p.paciente_id === paciente.paciente_id
          );
          setPacienteData(pacienteConCaracterizacion || paciente);
        } else {
          setPacienteData(paciente);
        }
      } catch (error) {
        console.error('Error cargando caracterización:', error);
        setPacienteData(paciente);
      } finally {
        setLoading(false);
      }
    };

    // Si ya se pasó caracterizacion como prop, usarla
    if (caracterizacion?.integrantes) {
      const pacienteConCaracterizacion = caracterizacion.integrantes.find(
        (p: any) => p.paciente_id === paciente.paciente_id
      );
      setPacienteData(pacienteConCaracterizacion || paciente);
      setLoading(false);
    } else {
      loadCaracterizacion();
    }
  }, [paciente, familia, caracterizacion]);

  if (loading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <ResponsiveCard>
          <div className="text-center py-8">
            <div className="text-sm text-stone-500">Cargando datos del paciente...</div>
          </div>
        </ResponsiveCard>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header del paciente */}
      <ResponsiveCard>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-lg hover:bg-stone-100">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <div className="flex-1">
            <h3 className="font-semibold text-stone-900">
              {paciente.primer_nombre} {paciente.segundo_nombre} {paciente.primer_apellido} {paciente.segundo_apellido}
            </h3>
            <p className="text-sm text-stone-500">
              {paciente.tipo_documento} {paciente.numero_documento} • {paciente.genero}
            </p>
            {paciente.fecha_nacimiento && (
              <p className="text-xs text-stone-400">
                Nacido: {new Date(paciente.fecha_nacimiento).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <ResponsiveBadge tone="admin">
              {familia.apellido_principal}
            </ResponsiveBadge>
          </div>
        </div>
      </ResponsiveCard>

      {/* Datos de caracterización del paciente */}
      {pacienteData?.fecha_caracterizacion ? (
        <ResponsiveCard>
          <h4 className="font-semibold text-stone-900 mb-3">Caracterización Individual</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-stone-500">Rol Familiar</div>
              <div className="text-sm font-medium text-stone-900">
                {pacienteData.rol_familiar || 'No especificado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Ocupación</div>
              <div className="text-sm font-medium text-stone-900">
                {pacienteData.ocupacion || 'No especificado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Nivel Educativo</div>
              <div className="text-sm font-medium text-stone-900">
                {pacienteData.nivel_educativo || 'No especificado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Grupo Poblacional</div>
              <div className="text-sm font-medium text-stone-900">
                {pacienteData.grupo_poblacional || 'No especificado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Régimen de Afiliación</div>
              <div className="text-sm font-medium text-stone-900">
                {pacienteData.regimen_afiliacion || 'No especificado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Pertenencia Étnica</div>
              <div className="text-sm font-medium text-stone-900">
                {pacienteData.pertenencia_etnica || 'No especificado'}
              </div>
            </div>
            {pacienteData.discapacidad && pacienteData.discapacidad.length > 0 && (
              <div className="md:col-span-2">
                <div className="text-xs text-stone-500">Discapacidad</div>
                <div className="text-sm font-medium text-stone-900">
                  {pacienteData.discapacidad.join(', ')}
                </div>
              </div>
            )}
            {pacienteData.victima_violencia && (
              <div className="md:col-span-2">
                <ResponsiveBadge tone="warning">Víctima de Violencia</ResponsiveBadge>
              </div>
            )}
          </div>
          
          {/* Datos de salud si existen */}
          {pacienteData.datos_salud && (
            <div className="mt-4 pt-4 border-t border-stone-200">
              <h5 className="font-medium text-stone-900 mb-2">Datos de Salud</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pacienteData.datos_salud.peso && (
                  <div>
                    <div className="text-xs text-stone-500">Peso</div>
                    <div className="text-sm font-medium text-stone-900">
                      {pacienteData.datos_salud.peso} kg
                    </div>
                  </div>
                )}
                {pacienteData.datos_salud.talla && (
                  <div>
                    <div className="text-xs text-stone-500">Talla</div>
                    <div className="text-sm font-medium text-stone-900">
                      {pacienteData.datos_salud.talla} cm
                    </div>
                  </div>
                )}
                {pacienteData.datos_salud.diagnostico && (
                  <div>
                    <div className="text-xs text-stone-500">Diagnóstico Nutricional</div>
                    <div className="text-sm font-medium text-stone-900">
                      {pacienteData.datos_salud.diagnostico}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </ResponsiveCard>
      ) : (
        <ResponsiveCard>
          <div className="text-center py-6">
            <div className="text-sm text-stone-500 mb-2">Sin caracterización individual</div>
            <div className="text-xs text-stone-400">
              Este paciente no tiene datos de caracterización individual registrados
            </div>
          </div>
        </ResponsiveCard>
      )}

      {/* Información de la familia */}
      <ResponsiveCard>
        <h4 className="font-semibold text-stone-900 mb-3">Información Familiar</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-stone-500">Familia</div>
            <div className="text-sm font-medium text-stone-900">{familia.apellido_principal}</div>
          </div>
          <div>
            <div className="text-xs text-stone-500">Dirección</div>
            <div className="text-sm font-medium text-stone-900">
              {familia.direccion}, {familia.municipio}
            </div>
          </div>
          {familia.telefono_contacto && (
            <div>
              <div className="text-xs text-stone-500">Teléfono de Contacto</div>
              <div className="text-sm font-medium text-stone-900">{familia.telefono_contacto}</div>
            </div>
          )}
        </div>
      </ResponsiveCard>

      {/* Acciones disponibles */}
      {canCreatePlanOrDemanda && (
        <ResponsiveCard>
          <h4 className="font-semibold text-stone-900 mb-3">Acciones Disponibles</h4>
          <div className="flex flex-wrap gap-2">
            <ResponsiveButton 
              variant="primary" 
              size="sm"
              onClick={() => {
                const ev: any = new CustomEvent('openPlanesCuidado', { detail: { paciente, familia } });
                window.dispatchEvent(ev);
              }}
            >
              Crear Plan de Cuidado Familiar
            </ResponsiveButton>
            <ResponsiveButton 
              variant="primary" 
              size="sm"
              onClick={() => {
                const ev: any = new CustomEvent('openDemandasInducidas', { detail: { paciente, familia } });
                window.dispatchEvent(ev);
              }}
            >
              Crear Demanda Inducida
            </ResponsiveButton>
          </div>
        </ResponsiveCard>
      )}
    </div>
  );
}

function ConsultasAsignadasView({ deviceType }: any) {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [demandasInducidas, setDemandasInducidas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'consultas' | 'demandas'>('demandas');

  const loadDemandasInducidas = async () => {
    try {
      setLoading(true);
      const user = AuthService.getCurrentUser();
      if (user?.id) {
        const data = await AuthService.getDemandasAsignadas(Number(user.id));
        setDemandasInducidas(data);
      }
    } catch (error) {
      console.error('Error cargando demandas inducidas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDemandasInducidas();
  }, []);

  // Filtrar demandas según la pestaña activa
  const getDemandasFiltradas = () => {
    if (activeTab === 'consultas') {
      // Mostrar solo demandas pendientes o asignadas, ordenadas por fecha
      return demandasInducidas
        .filter(d => d.estado === 'Pendiente' || d.estado === 'Asignada')
        .sort((a, b) => new Date(a.fecha_demanda).getTime() - new Date(b.fecha_demanda).getTime());
    } else {
      // Mostrar todas las demandas
      return demandasInducidas.sort((a, b) => new Date(b.fecha_demanda).getTime() - new Date(a.fecha_demanda).getTime());
    }
  };

  const demandasFiltradas = getDemandasFiltradas();

  // Calcular edad desde fecha de nacimiento
  const calcularEdad = (fechaNacimiento: string) => {
    if (!fechaNacimiento) return null;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  if (selectedPatient) {
    return <HistoriaClinicaView patient={selectedPatient} onBack={() => setSelectedPatient(null)} deviceType={deviceType} />;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-stone-900">Consultas Médicas</h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pestañas */}
        <div className="flex space-x-1 bg-stone-100 p-1 rounded-lg mb-4">
          <button
            onClick={() => setActiveTab('demandas')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'demandas'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Demandas Inducidas
          </button>
          <button
            onClick={() => setActiveTab('consultas')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'consultas'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Consultas Programadas
          </button>
        </div>

        {/* Contenido de las pestañas */}
        {activeTab === 'demandas' ? (
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500 mx-auto"></div>
                <span className="ml-3 text-stone-600">Cargando demandas...</span>
              </div>
            ) : demandasInducidas.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-sm text-stone-500 mb-2">No hay demandas inducidas asignadas</div>
                <div className="text-xs text-stone-400">
                  Las demandas inducidas aparecerán aquí cuando te sean asignadas
                </div>
              </div>
            ) : (
              demandasInducidas.map((demanda) => (
                <button
                  key={demanda.demanda_id}
                  onClick={() => setSelectedPatient({
                    id: demanda.paciente_id,
                    nombre: `${demanda.primer_nombre} ${demanda.primer_apellido}`,
                    documento: demanda.numero_documento,
                    demanda: demanda
                  })}
                  className="w-full p-4 bg-stone-50 rounded-xl text-left hover:bg-stone-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-stone-900">
                          {demanda.primer_nombre} {demanda.primer_apellido}
                        </h4>
                        <ResponsiveBadge tone="admin">Demanda Inducida</ResponsiveBadge>
                      </div>
                      <p className="text-sm text-stone-500 mb-2">
                        {demanda.numero_documento} • Familia {demanda.apellido_principal}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-stone-400" />
                        <span className="text-sm text-stone-600">
                          {new Date(demanda.fecha_demanda).toLocaleDateString()}
                        </span>
                        <ResponsiveBadge tone={
                          demanda.estado === 'Realizada' ? 'health' :
                          demanda.estado === 'Asignada' ? 'admin' : 'warning'
                        }>
                          {demanda.estado}
                        </ResponsiveBadge>
                      </div>
                      
                      {demanda.diligenciamiento && demanda.diligenciamiento.length > 0 && (
                        <div className="mb-2">
                          <div className="text-xs text-stone-500 mb-1">Diligenciamiento:</div>
                          <div className="text-sm text-stone-700">
                            {demanda.diligenciamiento.slice(0, 2).join(', ')}
                            {demanda.diligenciamiento.length > 2 && ` +${demanda.diligenciamiento.length - 2} más`}
                          </div>
                        </div>
                      )}
                      
                      {demanda.remision_a && demanda.remision_a.length > 0 && (
                        <div>
                          <div className="text-xs text-stone-500 mb-1">Remisión a:</div>
                          <div className="text-sm text-stone-700">
                            {demanda.remision_a.slice(0, 2).join(', ')}
                            {demanda.remision_a.length > 2 && ` +${demanda.remision_a.length - 2} más`}
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-stone-400" />
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500 mx-auto"></div>
                <span className="ml-3 text-stone-600">Cargando consultas...</span>
              </div>
            ) : demandasFiltradas.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-sm text-stone-500 mb-2">No hay consultas programadas</div>
                <div className="text-xs text-stone-400">
                  Las consultas aparecerán aquí cuando tengas demandas asignadas pendientes
                </div>
              </div>
            ) : (
              demandasFiltradas.map((demanda) => {
                const edad = calcularEdad(demanda.fecha_nacimiento);
                const fechaDemanda = new Date(demanda.fecha_demanda);
                const horaFormato = fechaDemanda.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                const esUrgente = demanda.estado === 'Asignada' && new Date(demanda.fecha_demanda) <= new Date();
                
                return (
                  <button
                    key={demanda.demanda_id}
                    onClick={() => setSelectedPatient({
                      id: demanda.paciente_id,
                      nombre: `${demanda.primer_nombre || ''} ${demanda.primer_apellido || ''}`.trim(),
                      documento: demanda.numero_documento,
                      edad: edad,
                      demanda: demanda,
                      fecha_nacimiento: demanda.fecha_nacimiento
                    })}
                    className="w-full p-4 bg-stone-50 rounded-xl text-left hover:bg-stone-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-stone-900">
                            {demanda.primer_nombre || ''} {demanda.primer_apellido || ''}
                          </h4>
                          {esUrgente && <ResponsiveBadge tone="rose">Urgente</ResponsiveBadge>}
                        </div>
                        <p className="text-sm text-stone-500 mb-2">
                          {demanda.numero_documento} {edad ? `• ${edad} años` : ''} • Familia {demanda.apellido_principal}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-stone-400" />
                          <span className="text-sm text-stone-600">{horaFormato}</span>
                          <span className="text-xs text-stone-400">
                            {fechaDemanda.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                          </span>
                          <ResponsiveBadge tone={
                            demanda.estado === 'Completada' || demanda.estado === 'Realizada' ? 'health' :
                            demanda.estado === 'En curso' || demanda.estado === 'Asignada' ? 'admin' : 'warning'
                          }>
                            {demanda.estado}
                          </ResponsiveBadge>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-stone-400" />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </ResponsiveCard>
    </div>
  );
}

function HistoriaClinicaView({ patient, onBack, deviceType }: any) {
  const [activeTab, setActiveTab] = useState("consulta");
  
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header del paciente */}
      <ResponsiveCard>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-lg hover:bg-stone-100">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <div className="flex-1">
            <h3 className="font-semibold text-stone-900">{patient.nombre}</h3>
            <p className="text-sm text-stone-500">{patient.documento} • {patient.edad} años</p>
          </div>
          <ResponsiveBadge tone={patient.urgente ? "rose" : "blue"}>
            {patient.urgente ? "Urgente" : "Regular"}
          </ResponsiveBadge>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 bg-stone-100 rounded-lg p-1">
          {[
            { key: "consulta", label: "Consulta" },
            { key: "receta", label: "Receta" },
            { key: "examenes", label: "Exámenes" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </ResponsiveCard>

      {/* Contenido según tab activo */}
      {activeTab === "consulta" && <ConsultaFormView patient={patient} deviceType={deviceType} />}
      {activeTab === "receta" && <RecetaFormView patient={patient} deviceType={deviceType} />}
      {activeTab === "examenes" && <ExamenesFormView patient={patient} deviceType={deviceType} />}
    </div>
  );
}

function ConsultaFormView({ patient, deviceType }: any) {
  const [atencionId, setAtencionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [enfermedadActual, setEnfermedadActual] = useState('');
  const [examenFisico, setExamenFisico] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [planManejo, setPlanManejo] = useState('');
  const [antecedentesPersonales, setAntecedentesPersonales] = useState<any>({
    patologicos: '', inmunologicos: '', ginecologicos: '', farmacologicos: '',
    quirurgicos: '', hospitalizaciones: '', alergicos: '', toxicologicos: '', traumatologicos: ''
  });
  const [antecedentesFamiliares, setAntecedentesFamiliares] = useState('');
  const sistemas = [
    'Cardiovascular','Digestivo','Renal','Nervioso','Organos de los sentidos','Mental','Musculoesqueletico'
  ];
  const [revisionPorSistemasSeleccion, setRevisionPorSistemasSeleccion] = useState<string[]>([]);
  const [revisionPorSistemasHallazgos, setRevisionPorSistemasHallazgos] = useState<Record<string,string>>({});

  // Cargar HC existente o crear nueva
  useEffect(() => {
    const cargarHC = async () => {
      if (!patient?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const user = AuthService.getCurrentUser();
        
        // Buscar la última atención del paciente
        const hcList = await AuthService.get(`/pacientes/${patient.id}/hc/medicina`);
        
        if (hcList && hcList.length > 0) {
          // Cargar la última HC
          const ultimaHC = hcList[0];
          setAtencionId(ultimaHC.atencion_id);
          
          // Cargar datos completos
          const hcCompleta = await AuthService.getHCMedicina(ultimaHC.atencion_id);
          
          if (hcCompleta) {
            setMotivo(hcCompleta.motivo_consulta || '');
            setEnfermedadActual(hcCompleta.enfermedad_actual || '');
            setExamenFisico(hcCompleta.examen_fisico || '');
            setDiagnostico(hcCompleta.diagnosticos_cie10 || '');
            setPlanManejo(hcCompleta.plan_manejo || '');
            setAntecedentesFamiliares(hcCompleta.antecedentes_familiares || '');
            
            // Procesar antecedentes personales
            if (hcCompleta.antecedentes_personales) {
              try {
                const antPer = typeof hcCompleta.antecedentes_personales === 'string' 
                  ? JSON.parse(hcCompleta.antecedentes_personales) 
                  : hcCompleta.antecedentes_personales;
                setAntecedentesPersonales(antPer);
              } catch (e) {
                console.error('Error parseando antecedentes personales:', e);
              }
            }
            
            // Procesar revisión por sistemas
            if (hcCompleta.revision_por_sistemas) {
              try {
                const revSistemas = typeof hcCompleta.revision_por_sistemas === 'string'
                  ? JSON.parse(hcCompleta.revision_por_sistemas)
                  : hcCompleta.revision_por_sistemas;
                
                if (revSistemas.sistemas) {
                  setRevisionPorSistemasSeleccion(revSistemas.sistemas);
                }
                if (revSistemas.hallazgos) {
                  setRevisionPorSistemasHallazgos(revSistemas.hallazgos);
                }
              } catch (e) {
                console.error('Error parseando revisión por sistemas:', e);
              }
            }
          }
        } else {
          // No hay HC, se creará una nueva al guardar
          setAtencionId(null);
        }
      } catch (error) {
        console.error('Error cargando HC:', error);
        // Si hay error, permitir crear nueva
        setAtencionId(null);
      } finally {
        setLoading(false);
      }
    };

    cargarHC();
  }, [patient?.id]);

  const toggleSistema = (s: string) => {
    setRevisionPorSistemasSeleccion(prev => (
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    ));
  };

  const cargarPerfilNormal = () => {
    setRevisionPorSistemasSeleccion(sistemas);
    const normal: Record<string,string> = {};
    sistemas.forEach(s => { normal[s] = 'Normal'; });
    setRevisionPorSistemasHallazgos(normal);
    setAntecedentesPersonales({
      patologicos: 'Niega', inmunologicos: 'Esquema al día', ginecologicos: 'Sin alteraciones',
      farmacologicos: 'Niega consumo crónico', quirurgicos: 'Niega', hospitalizaciones: 'Niega',
      alergicos: 'Niega', toxicologicos: 'Niega', traumatologicos: 'Niega'
    });
  };

  const handleGuardar = async () => {
    if (!motivo.trim() || !diagnostico.trim()) {
      alert('Por favor completa los campos obligatorios: Motivo de consulta y Diagnóstico');
      return;
    }

    try {
      setGuardando(true);
      const user = AuthService.getCurrentUser();
      
      const payload = {
        motivo_consulta: motivo,
        enfermedad_actual: enfermedadActual,
        antecedentes_personales: JSON.stringify(antecedentesPersonales),
        antecedentes_familiares: antecedentesFamiliares,
        revision_por_sistemas: JSON.stringify({ sistemas: revisionPorSistemasSeleccion, hallazgos: revisionPorSistemasHallazgos }),
        signos_vitales: null,
        examen_fisico: examenFisico,
        diagnosticos_cie10: diagnostico,
        plan_manejo: planManejo,
        recomendaciones: null,
        proxima_cita: null
      };

      if (atencionId) {
        // Actualizar HC existente
        await AuthService.updateHCMedicina(atencionId, payload);
        alert('Historia clínica actualizada exitosamente');
      } else {
        // Crear nueva atención y HC
        if (!user?.id || !patient?.id) {
          throw new Error('Usuario o paciente no disponible');
        }
        
        const resultado = await AuthService.crearHCMedicina({
          paciente_id: patient.id,
          usuario_id: user.id,
          fecha_atencion: new Date().toISOString().split('T')[0],
          ...payload
        });
        
        setAtencionId(resultado.atencion_id);
        alert('Nueva atención creada exitosamente');
      }
    } catch (e: any) {
      console.error('Error guardando:', e);
      alert(`Error: ${e.message || 'Error guardando historia clínica'}`);
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return (
      <ResponsiveCard>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500 mx-auto"></div>
          <span className="ml-3 text-stone-600">Cargando historia clínica...</span>
        </div>
      </ResponsiveCard>
    );
  }

  return (
    <ResponsiveCard>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-stone-900">Historia Clínica</h4>
        {atencionId && (
          <ResponsiveBadge tone="admin">Atención #{atencionId}</ResponsiveBadge>
        )}
      </div>
      <div className="space-y-4">
        <ResponsiveField label="Motivo de consulta" required>
          <ResponsiveInput value={motivo} onChange={(e: any) => setMotivo(e.target.value)} placeholder="Describe el motivo principal..." />
        </ResponsiveField>

        {/* Nuevos bloques después de Motivo de Consulta */}
        <ResponsiveCard>
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-medium text-stone-900">Revisión por Sistemas</h5>
            <ResponsiveButton size="sm" variant="secondary" onClick={cargarPerfilNormal}>Cargar Perfil Normal</ResponsiveButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sistemas.map((s) => (
              <div key={s} className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <label className="flex items-center gap-2 text-sm mb-2">
                  <input type="checkbox" className="rounded border-stone-300" checked={revisionPorSistemasSeleccion.includes(s)} onChange={() => toggleSistema(s)} />
                  <span>{s}</span>
                </label>
                {revisionPorSistemasSeleccion.includes(s) && (
                  <input
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm"
                    placeholder="Hallazgos..."
                    value={revisionPorSistemasHallazgos[s] || ''}
                    onChange={(e) => setRevisionPorSistemasHallazgos(prev => ({ ...prev, [s]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <h5 className="font-medium text-stone-900 mb-3">Antecedentes personales</h5>
          <div className={`grid gap-3 ${deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {Object.keys(antecedentesPersonales).map((k) => (
              <ResponsiveField key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}>
                <ResponsiveInput value={antecedentesPersonales[k]} onChange={(e: any) => setAntecedentesPersonales((p: any) => ({ ...p, [k]: e.target.value }))} />
              </ResponsiveField>
            ))}
          </div>
        </ResponsiveCard>

        <ResponsiveField label="Antecedentes familiares">
          <textarea className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base resize-none" rows={3} value={antecedentesFamiliares} onChange={(e) => setAntecedentesFamiliares(e.target.value)} />
        </ResponsiveField>

        <ResponsiveField label="Enfermedad actual">
          <textarea className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base resize-none" rows={3} placeholder="Inicio, duración, características..." value={enfermedadActual} onChange={(e) => setEnfermedadActual(e.target.value)} />
        </ResponsiveField>

        <div className={`grid gap-3 ${deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
          <ResponsiveField label="Presión arterial">
            <ResponsiveInput placeholder="120/80" />
          </ResponsiveField>
          <ResponsiveField label="Frecuencia cardíaca">
            <ResponsiveInput placeholder="72 lpm" />
          </ResponsiveField>
        </div>

        <ResponsiveField label="Examen físico">
          <textarea className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base resize-none" rows={3} placeholder="Hallazgos relevantes..." value={examenFisico} onChange={(e) => setExamenFisico(e.target.value)} />
        </ResponsiveField>

        <ResponsiveField label="Diagnóstico principal (CIE-10)" required>
          <ResponsiveInput placeholder="Ej: J00 - Rinofaringitis aguda" value={diagnostico} onChange={(e: any) => setDiagnostico(e.target.value)} />
        </ResponsiveField>

        <ResponsiveField label="Plan de tratamiento">
          <textarea className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base resize-none" rows={3} placeholder="Tratamiento, educación, controles..." value={planManejo} onChange={(e) => setPlanManejo(e.target.value)} />
        </ResponsiveField>

        <div className={`flex gap-3 ${deviceType === 'mobile' ? 'flex-col' : 'flex-row'}`}>
          <ResponsiveButton 
            variant="secondary" 
            onClick={handleGuardar} 
            disabled={guardando}
            className={`${deviceType === 'mobile' ? 'w-full' : 'flex-1'} flex items-center justify-center gap-2`}
          >
            <Save className="w-4 h-4" />
            {guardando ? 'Guardando...' : atencionId ? 'Actualizar' : 'Crear Atención'}
          </ResponsiveButton>
          <ResponsiveButton 
            onClick={async () => {
              if (!atencionId) {
                // Primero crear la atención
                await handleGuardar();
              } else {
                // Guardar los datos actualizados
                await handleGuardar();
              }
              
              // Marcar atención como completada si existe
              if (atencionId) {
                try {
                  await AuthService.completarAtencion(atencionId);
                  alert('Consulta finalizada exitosamente');
                } catch (e: any) {
                  console.error('Error completando atención:', e);
                  alert('Error al finalizar consulta: ' + e.message);
                }
              }
            }}
            disabled={guardando}
            className={`${deviceType === 'mobile' ? 'w-full' : 'flex-1'} flex items-center justify-center gap-2`}
          >
            <Send className="w-4 h-4" />
            {guardando ? 'Finalizando...' : 'Finalizar'}
          </ResponsiveButton>
        </div>
      </div>
    </ResponsiveCard>
  );
}

function RecetaFormView({ patient, deviceType }: any) {
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [nuevoMedicamento, setNuevoMedicamento] = useState({ nombre: '', dosis: '', frecuencia: '', dias: '' });
  const [indicaciones, setIndicaciones] = useState('');
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [recetaId, setRecetaId] = useState<number | null>(null);
  const [atencionId, setAtencionId] = useState<number | null>(null);

  useEffect(() => {
    const cargarRecetas = async () => {
      if (!patient?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const recetas = await AuthService.getRecetasPaciente(patient.id);
        
        // Obtener atencion_id de la consulta activa si existe
        const hcList = await AuthService.get(`/pacientes/${patient.id}/hc/medicina`);
        if (hcList && hcList.length > 0) {
          setAtencionId(hcList[0].atencion_id);
        }

        // Cargar la última receta activa o más reciente
        if (recetas && recetas.length > 0) {
          const ultimaReceta = recetas[0];
          setRecetaId(ultimaReceta.receta_id);
          if (ultimaReceta.medicamentos && Array.isArray(ultimaReceta.medicamentos)) {
            setMedicamentos(ultimaReceta.medicamentos);
          }
          setIndicaciones(ultimaReceta.indicaciones || '');
        }
      } catch (error) {
        console.error('Error cargando recetas:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarRecetas();
  }, [patient?.id]);

  const agregarMedicamento = () => {
    if (!nuevoMedicamento.nombre.trim()) {
      alert('Por favor ingresa el nombre del medicamento');
      return;
    }
    
    const nuevoId = medicamentos.length > 0 
      ? Math.max(...medicamentos.map((m: any) => m.id || 0)) + 1 
      : 1;
    
    setMedicamentos([...medicamentos, {
      id: nuevoId,
      ...nuevoMedicamento
    }]);
    
    setNuevoMedicamento({ nombre: '', dosis: '', frecuencia: '', dias: '' });
  };

  const eliminarMedicamento = (id: any) => {
    setMedicamentos(medicamentos.filter((m: any) => m.id !== id));
  };

  const handleGuardar = async () => {
    if (medicamentos.length === 0) {
      alert('Agrega al menos un medicamento a la receta');
      return;
    }

    if (!atencionId) {
      alert('No hay una atención asociada. Primero completa la consulta médica.');
      return;
    }

    try {
      setGuardando(true);
      const user = AuthService.getCurrentUser();
      
      if (!user?.id || !patient?.id) {
        throw new Error('Usuario o paciente no disponible');
      }

      const recetaData = {
        atencion_id: atencionId,
        paciente_id: patient.id,
        usuario_id: user.id,
        fecha_receta: new Date().toISOString().split('T')[0],
        medicamentos: medicamentos,
        indicaciones: indicaciones,
        estado: 'Activa'
      };

      if (recetaId) {
        // Actualizar receta existente (se puede implementar PUT si existe)
        await AuthService.crearReceta(recetaData);
        alert('Receta actualizada exitosamente');
      } else {
        const resultado = await AuthService.crearReceta(recetaData);
        setRecetaId(resultado.receta_id);
        alert('Receta creada exitosamente');
      }
    } catch (e: any) {
      console.error('Error guardando receta:', e);
      alert(`Error: ${e.message || 'Error guardando receta'}`);
    } finally {
      setGuardando(false);
    }
  };

  const handleImprimir = () => {
    const contenido = `
      RECETA MÉDICA
      
      Paciente: ${patient?.nombre || 'N/A'}
      Documento: ${patient?.documento || 'N/A'}
      Fecha: ${new Date().toLocaleDateString('es-ES')}
      
      MEDICAMENTOS:
      ${medicamentos.map((m: any, idx: number) => 
        `${idx + 1}. ${m.nombre} - ${m.dosis} - ${m.frecuencia}${m.dias ? ` - ${m.dias} días` : ''}`
      ).join('\n')}
      
      ${indicaciones ? `INDICACIONES:\n${indicaciones}` : ''}
    `;
    
    const ventanaImpresion = window.open('', '_blank');
    if (ventanaImpresion) {
      ventanaImpresion.document.write(`
        <html>
          <head><title>Receta Médica</title></head>
          <body style="font-family: Arial; padding: 20px;">
            <pre>${contenido}</pre>
          </body>
        </html>
      `);
      ventanaImpresion.document.close();
      ventanaImpresion.print();
    }
    
    // Marcar como impresa
    if (recetaId) {
      AuthService.marcarRecetaImpresion(recetaId).catch(console.error);
    }
  };

  const handleCompartir = async () => {
    const contenido = `
Receta Médica
Paciente: ${patient?.nombre || 'N/A'}
Documento: ${patient?.documento || 'N/A'}
Fecha: ${new Date().toLocaleDateString('es-ES')}

Medicamentos:
${medicamentos.map((m: any, idx: number) => 
  `${idx + 1}. ${m.nombre} - ${m.dosis} - ${m.frecuencia}${m.dias ? ` - ${m.dias} días` : ''}`
).join('\n')}

${indicaciones ? `Indicaciones:\n${indicaciones}` : ''}
    `.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Receta Médica',
          text: contenido
        });
      } catch (err) {
        console.error('Error compartiendo:', err);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(contenido).then(() => {
        alert('Receta copiada al portapapeles');
      }).catch(() => {
        alert('No se pudo compartir la receta');
      });
    }
  };

  if (loading) {
    return (
      <ResponsiveCard>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500 mx-auto"></div>
          <span className="ml-3 text-stone-600">Cargando recetas...</span>
        </div>
      </ResponsiveCard>
    );
  }

  return (
    <ResponsiveCard>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-stone-900">Recetario Digital</h4>
        {recetaId && (
          <ResponsiveBadge tone="admin">Receta #{recetaId}</ResponsiveBadge>
        )}
      </div>
      
      <div className="space-y-3 mb-4">
        {medicamentos.length === 0 ? (
          <div className="text-center py-6 text-stone-500 text-sm">
            No hay medicamentos agregados. Agrega medicamentos a continuación.
          </div>
        ) : (
          medicamentos.map((med: any) => (
            <div key={med.id} className="p-3 bg-stone-50 rounded-lg flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-stone-900">{med.nombre}</div>
                <div className="text-sm text-stone-600 mt-1">
                  {med.dosis && `${med.dosis} • `}
                  {med.frecuencia && `${med.frecuencia} • `}
                  {med.dias && `${med.dias} días`}
                </div>
              </div>
              <button
                onClick={() => eliminarMedicamento(med.id)}
                className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="space-y-4">
        <ResponsiveField label="Nombre del medicamento">
          <ResponsiveInput 
            value={nuevoMedicamento.nombre}
            onChange={(e: any) => setNuevoMedicamento({ ...nuevoMedicamento, nombre: e.target.value })}
            placeholder="Ej: Paracetamol 500mg" 
          />
        </ResponsiveField>
        
        <div className={`grid gap-3 ${deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
          <ResponsiveField label="Dosis">
            <ResponsiveInput 
              value={nuevoMedicamento.dosis}
              onChange={(e: any) => setNuevoMedicamento({ ...nuevoMedicamento, dosis: e.target.value })}
              placeholder="Ej: 1 tableta" 
            />
          </ResponsiveField>
          <ResponsiveField label="Frecuencia">
            <ResponsiveInput 
              value={nuevoMedicamento.frecuencia}
              onChange={(e: any) => setNuevoMedicamento({ ...nuevoMedicamento, frecuencia: e.target.value })}
              placeholder="Ej: Cada 8 horas" 
            />
          </ResponsiveField>
        </div>

        <ResponsiveField label="Duración (días)">
          <ResponsiveInput 
            value={nuevoMedicamento.dias}
            onChange={(e: any) => setNuevoMedicamento({ ...nuevoMedicamento, dias: e.target.value })}
            placeholder="Ej: 5" 
          />
        </ResponsiveField>
        
        <ResponsiveButton onClick={agregarMedicamento} className="w-full" variant="secondary">
          <Plus className="w-4 h-4 mr-2" />
          Agregar a receta
        </ResponsiveButton>

        <ResponsiveField label="Indicaciones adicionales">
          <textarea
            className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base resize-none"
            rows={3}
            value={indicaciones}
            onChange={(e) => setIndicaciones(e.target.value)}
            placeholder="Indicaciones especiales, precauciones, etc..."
          />
        </ResponsiveField>
        
        <div className={`flex gap-3 ${deviceType === 'mobile' ? 'flex-col' : 'flex-row'}`}>
          <ResponsiveButton 
            variant="secondary" 
            onClick={handleGuardar}
            disabled={guardando}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            {guardando ? 'Guardando...' : 'Guardar'}
          </ResponsiveButton>
          <ResponsiveButton 
            onClick={handleImprimir}
            disabled={medicamentos.length === 0 || !recetaId}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Imprimir
          </ResponsiveButton>
          <ResponsiveButton 
            variant="secondary"
            onClick={handleCompartir}
            disabled={medicamentos.length === 0}
            className="flex-1"
          >
            <Send className="w-4 h-4 mr-2" />
            Compartir
          </ResponsiveButton>
        </div>
      </div>
    </ResponsiveCard>
  );
}

function ExamenesFormView({ patient, deviceType }: any) {
  const [examenes, setExamenes] = useState<any[]>([]);
  const [nuevoExamen, setNuevoExamen] = useState({ tipo: '', nombre: '', justificacion: '', prioridad: 'rutinaria' });
  const [indicacionesClinicas, setIndicacionesClinicas] = useState('');
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [ordenId, setOrdenId] = useState<number | null>(null);
  const [atencionId, setAtencionId] = useState<number | null>(null);

  const tiposExamen = [
    { value: "hemograma", label: "Cuadro hemático completo" },
    { value: "glicemia", label: "Glicemia en ayunas" },
    { value: "orina", label: "Parcial de orina" },
    { value: "radiografia", label: "Radiografía de tórax" },
    { value: "colesterol", label: "Colesterol total y fracciones" },
    { value: "tsh", label: "TSH" },
    { value: "creatinina", label: "Creatinina" },
    { value: "ecg", label: "Electrocardiograma" },
    { value: "otros", label: "Otros" }
  ];

  useEffect(() => {
    const cargarOrdenes = async () => {
      if (!patient?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const ordenes = await AuthService.getOrdenesPaciente(patient.id);
        
        // Obtener atencion_id de la consulta activa si existe
        const hcList = await AuthService.get(`/pacientes/${patient.id}/hc/medicina`);
        if (hcList && hcList.length > 0) {
          setAtencionId(hcList[0].atencion_id);
        }

        // Cargar la última orden pendiente o más reciente
        if (ordenes && ordenes.length > 0) {
          const ultimaOrden = ordenes[0];
          setOrdenId(ultimaOrden.orden_id);
          if (ultimaOrden.examenes && Array.isArray(ultimaOrden.examenes)) {
            setExamenes(ultimaOrden.examenes);
          }
          setIndicacionesClinicas(ultimaOrden.indicaciones_clinicas || '');
        }
      } catch (error) {
        console.error('Error cargando órdenes:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarOrdenes();
  }, [patient?.id]);

  const agregarExamen = () => {
    if (!nuevoExamen.nombre.trim() || !nuevoExamen.tipo) {
      alert('Por favor completa el tipo y nombre del examen');
      return;
    }
    
    const nuevoId = examenes.length > 0 
      ? Math.max(...examenes.map((e: any) => e.id || 0)) + 1 
      : 1;
    
    setExamenes([...examenes, {
      id: nuevoId,
      tipo: nuevoExamen.tipo,
      nombre: nuevoExamen.nombre,
      justificacion: nuevoExamen.justificacion,
      prioridad: nuevoExamen.prioridad
    }]);
    
    setNuevoExamen({ tipo: '', nombre: '', justificacion: '', prioridad: 'rutinaria' });
  };

  const eliminarExamen = (id: any) => {
    setExamenes(examenes.filter((e: any) => e.id !== id));
  };

  const handleGuardar = async () => {
    if (examenes.length === 0) {
      alert('Agrega al menos un examen a la orden');
      return;
    }

    if (!atencionId) {
      alert('No hay una atención asociada. Primero completa la consulta médica.');
      return;
    }

    try {
      setGuardando(true);
      const user = AuthService.getCurrentUser();
      
      if (!user?.id || !patient?.id) {
        throw new Error('Usuario o paciente no disponible');
      }

      const ordenData = {
        atencion_id: atencionId,
        paciente_id: patient.id,
        usuario_id: user.id,
        fecha_orden: new Date().toISOString().split('T')[0],
        examenes: examenes,
        indicaciones_clinicas: indicacionesClinicas,
        estado: 'Pendiente'
      };

      if (ordenId) {
        await AuthService.crearOrdenLaboratorio(ordenData);
        alert('Orden actualizada exitosamente');
      } else {
        const resultado = await AuthService.crearOrdenLaboratorio(ordenData);
        setOrdenId(resultado.orden_id);
        alert('Orden creada exitosamente');
      }
    } catch (e: any) {
      console.error('Error guardando orden:', e);
      alert(`Error: ${e.message || 'Error guardando orden'}`);
    } finally {
      setGuardando(false);
    }
  };

  const handleImprimir = () => {
    const contenido = `
      ORDEN DE LABORATORIO / EXÁMENES
      
      Paciente: ${patient?.nombre || 'N/A'}
      Documento: ${patient?.documento || 'N/A'}
      Fecha: ${new Date().toLocaleDateString('es-ES')}
      
      EXÁMENES SOLICITADOS:
      ${examenes.map((e: any, idx: number) => 
        `${idx + 1}. ${e.nombre} (${e.tipo}) - Prioridad: ${e.prioridad}${e.justificacion ? `\n   Justificación: ${e.justificacion}` : ''}`
      ).join('\n\n')}
      
      ${indicacionesClinicas ? `INDICACIONES CLÍNICAS:\n${indicacionesClinicas}` : ''}
    `;
    
    const ventanaImpresion = window.open('', '_blank');
    if (ventanaImpresion) {
      ventanaImpresion.document.write(`
        <html>
          <head><title>Orden de Laboratorio</title></head>
          <body style="font-family: Arial; padding: 20px;">
            <pre>${contenido}</pre>
          </body>
        </html>
      `);
      ventanaImpresion.document.close();
      ventanaImpresion.print();
    }
    
    // Marcar como impresa
    if (ordenId) {
      AuthService.marcarOrdenImpresion(ordenId).catch(console.error);
    }
  };

  const handleCompartir = async () => {
    const contenido = `
Orden de Laboratorio / Exámenes
Paciente: ${patient?.nombre || 'N/A'}
Documento: ${patient?.documento || 'N/A'}
Fecha: ${new Date().toLocaleDateString('es-ES')}

Exámenes Solicitados:
${examenes.map((e: any, idx: number) => 
  `${idx + 1}. ${e.nombre} (${e.tipo}) - Prioridad: ${e.prioridad}${e.justificacion ? `\n   Justificación: ${e.justificacion}` : ''}`
).join('\n\n')}

${indicacionesClinicas ? `Indicaciones Clínicas:\n${indicacionesClinicas}` : ''}
    `.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Orden de Laboratorio',
          text: contenido
        });
      } catch (err) {
        console.error('Error compartiendo:', err);
      }
    } else {
      navigator.clipboard.writeText(contenido).then(() => {
        alert('Orden copiada al portapapeles');
      }).catch(() => {
        alert('No se pudo compartir la orden');
      });
    }
  };

  if (loading) {
    return (
      <ResponsiveCard>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500 mx-auto"></div>
          <span className="ml-3 text-stone-600">Cargando órdenes...</span>
        </div>
      </ResponsiveCard>
    );
  }

  return (
    <ResponsiveCard>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-stone-900">Órdenes de Exámenes</h4>
        {ordenId && (
          <ResponsiveBadge tone="admin">Orden #{ordenId}</ResponsiveBadge>
        )}
      </div>
      <div className="space-y-4">
        <div className="space-y-3 mb-4">
          {examenes.length === 0 ? (
            <div className="text-center py-6 text-stone-500 text-sm">
              No hay exámenes agregados. Agrega exámenes a continuación.
            </div>
          ) : (
            examenes.map((exam: any) => (
              <div key={exam.id} className="p-3 bg-stone-50 rounded-lg flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-stone-900">{exam.nombre}</div>
                  <div className="text-sm text-stone-600 mt-1">
                    Tipo: {tiposExamen.find(t => t.value === exam.tipo)?.label || exam.tipo} • 
                    Prioridad: {exam.prioridad}
                  </div>
                  {exam.justificacion && (
                    <div className="text-xs text-stone-500 mt-1">
                      {exam.justificacion}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => eliminarExamen(exam.id)}
                  className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <ResponsiveField label="Tipo de examen" required>
          <select
            className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
            value={nuevoExamen.tipo}
            onChange={(e) => {
              const tipo = e.target.value;
              setNuevoExamen({ 
                ...nuevoExamen, 
                tipo,
                nombre: tipo === 'otros' ? '' : (tiposExamen.find(t => t.value === tipo)?.label || '')
              });
            }}
          >
            <option value="">Seleccionar examen</option>
            {tiposExamen.map(tipo => (
              <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
            ))}
          </select>
        </ResponsiveField>

        <ResponsiveField label="Nombre del examen" required>
          <ResponsiveInput 
            value={nuevoExamen.nombre}
            onChange={(e: any) => setNuevoExamen({ ...nuevoExamen, nombre: e.target.value })}
            placeholder={nuevoExamen.tipo === 'otros' ? "Especificar examen" : "Nombre del examen"}
            disabled={nuevoExamen.tipo !== 'otros' && nuevoExamen.tipo !== ''}
          />
        </ResponsiveField>
        
        <ResponsiveField label="Justificación clínica">
          <textarea
            className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base resize-none"
            rows={2}
            value={nuevoExamen.justificacion}
            onChange={(e) => setNuevoExamen({ ...nuevoExamen, justificacion: e.target.value })}
            placeholder="Justificación médica para este examen..."
          />
        </ResponsiveField>

        <ResponsiveField label="Prioridad">
          <select
            className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
            value={nuevoExamen.prioridad}
            onChange={(e) => setNuevoExamen({ ...nuevoExamen, prioridad: e.target.value })}
          >
            <option value="rutinaria">Rutinaria</option>
            <option value="prioritaria">Prioritaria</option>
            <option value="urgente">Urgente</option>
          </select>
        </ResponsiveField>

        <ResponsiveButton onClick={agregarExamen} className="w-full" variant="secondary">
          <Plus className="w-4 h-4 mr-2" />
          Agregar a orden
        </ResponsiveButton>

        <ResponsiveField label="Indicaciones clínicas generales">
          <textarea
            className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base resize-none"
            rows={3}
            value={indicacionesClinicas}
            onChange={(e) => setIndicacionesClinicas(e.target.value)}
            placeholder="Indicaciones clínicas generales para todos los exámenes..."
          />
        </ResponsiveField>
        
        <div className={`flex gap-3 ${deviceType === 'mobile' ? 'flex-col' : 'flex-row'}`}>
          <ResponsiveButton 
            variant="secondary" 
            onClick={handleGuardar}
            disabled={guardando}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            {guardando ? 'Guardando...' : 'Guardar'}
          </ResponsiveButton>
          <ResponsiveButton 
            onClick={handleImprimir}
            disabled={examenes.length === 0 || !ordenId}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Imprimir
          </ResponsiveButton>
          <ResponsiveButton 
            variant="secondary"
            onClick={handleCompartir}
            disabled={examenes.length === 0}
            className="flex-1"
          >
            <Send className="w-4 h-4 mr-2" />
            Compartir
          </ResponsiveButton>
        </div>
      </div>
    </ResponsiveCard>
  );
}

function ConsultasRealizadasView({ deviceType }: any) {
  const [hcCompletadas, setHcCompletadas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroDesde, setFiltroDesde] = useState<string>('');
  const [filtroHasta, setFiltroHasta] = useState<string>('');
  const [selectedHC, setSelectedHC] = useState<any>(null);

  const loadHCCompletadas = async () => {
    try {
      setLoading(true);
      const user = AuthService.getCurrentUser();
      if (user?.id) {
        const data = await AuthService.getHCCompletadas(
          Number(user.id),
          filtroDesde || undefined,
          filtroHasta || undefined
        );
        setHcCompletadas(data || []);
      }
    } catch (error) {
      console.error('Error cargando HC completadas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHCCompletadas();
  }, [filtroDesde, filtroHasta]);

  const getNombreCompleto = (hc: any) => {
    return `${hc.primer_nombre || ''} ${hc.segundo_nombre || ''} ${hc.primer_apellido || ''} ${hc.segundo_apellido || ''}`.trim();
  };

  if (selectedHC) {
    return (
      <div className="space-y-4 md:space-y-6">
        <ResponsiveCard>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setSelectedHC(null)} className="p-2 -ml-2 rounded-lg hover:bg-stone-100">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div className="flex-1">
              <h3 className="font-semibold text-stone-900">{getNombreCompleto(selectedHC)}</h3>
              <p className="text-sm text-stone-500">
                {selectedHC.numero_documento} • {new Date(selectedHC.fecha_atencion).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <h4 className="font-semibold text-stone-900 mb-4">Detalles de la Consulta</h4>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-stone-500 mb-1">Motivo de Consulta</div>
              <div className="text-sm text-stone-900">{selectedHC.motivo_consulta || 'N/A'}</div>
            </div>
            <div>
              <div className="text-xs text-stone-500 mb-1">Diagnóstico</div>
              <div className="text-sm text-stone-900">{selectedHC.diagnosticos_cie10 || 'N/A'}</div>
            </div>
            <div>
              <div className="text-xs text-stone-500 mb-1">Plan de Manejo</div>
              <div className="text-sm text-stone-900">{selectedHC.plan_manejo || 'N/A'}</div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <h3 className="font-semibold text-stone-900 mb-4">Consultas Realizadas</h3>
        
        <div className="space-y-3 mb-4">
          <div className={`grid gap-3 ${deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <ResponsiveField label="Desde">
              <ResponsiveInput
                type="date"
                value={filtroDesde}
                onChange={(e: any) => setFiltroDesde(e.target.value)}
              />
            </ResponsiveField>
            <ResponsiveField label="Hasta">
              <ResponsiveInput
                type="date"
                value={filtroHasta}
                onChange={(e: any) => setFiltroHasta(e.target.value)}
              />
            </ResponsiveField>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500 mx-auto"></div>
            <span className="ml-3 text-stone-600">Cargando consultas...</span>
          </div>
        ) : hcCompletadas.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-sm text-stone-500 mb-2">No hay consultas realizadas</div>
            <div className="text-xs text-stone-400">
              {filtroDesde || filtroHasta ? 'Intenta con otros filtros de fecha' : 'Las consultas completadas aparecerán aquí'}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {hcCompletadas.map((hc) => (
              <button
                key={hc.atencion_id}
                onClick={() => setSelectedHC(hc)}
                className="w-full p-4 bg-stone-50 rounded-xl text-left hover:bg-stone-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-900 mb-1">
                      {getNombreCompleto(hc)}
                    </h4>
                    <p className="text-sm text-stone-500 mb-2">
                      {hc.numero_documento} • Familia {hc.familia_apellido}
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-stone-400" />
                      <span className="text-sm text-stone-600">
                        {new Date(hc.fecha_atencion).toLocaleDateString('es-ES', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    {hc.diagnosticos_cie10 && (
                      <div className="mt-2">
                        <ResponsiveBadge tone="health">{hc.diagnosticos_cie10}</ResponsiveBadge>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-400" />
                </div>
              </button>
            ))}
          </div>
        )}
      </ResponsiveCard>
    </div>
  );
}

function BitacoraView({ deviceType }: any) {
  const [bitacora, setBitacora] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState(new Date().getFullYear());

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const loadBitacora = async () => {
    try {
      setLoading(true);
      const user = AuthService.getCurrentUser();
      if (user?.id) {
        const data = await AuthService.getBitacora(Number(user.id), mes, ano);
        setBitacora(data);
      }
    } catch (error) {
      console.error('Error cargando bitácora:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBitacora();
  }, [mes, ano]);

  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <h3 className="font-semibold text-stone-900 mb-4">Bitácora de Actividades</h3>
        
        <div className="space-y-3 mb-4">
          <div className={`grid gap-3 ${deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <ResponsiveField label="Mes">
              <select
                className="w-full px-3 py-2 md:py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
                value={mes}
                onChange={(e) => setMes(Number(e.target.value))}
              >
                {meses.map((m, idx) => (
                  <option key={idx} value={idx + 1}>{m}</option>
                ))}
              </select>
            </ResponsiveField>
            <ResponsiveField label="Año">
              <ResponsiveInput
                type="number"
                value={ano}
                onChange={(e: any) => setAno(Number(e.target.value))}
                min="2020"
                max={new Date().getFullYear()}
              />
            </ResponsiveField>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500 mx-auto"></div>
            <span className="ml-3 text-stone-600">Cargando bitácora...</span>
          </div>
        ) : bitacora ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 p-4 bg-stone-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{bitacora.total_consultas || 0}</div>
                <div className="text-xs text-stone-600">Consultas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{bitacora.total_recetas || 0}</div>
                <div className="text-xs text-stone-600">Recetas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{bitacora.total_ordenes || 0}</div>
                <div className="text-xs text-stone-600">Órdenes</div>
              </div>
            </div>

            {bitacora.detalle_diario && bitacora.detalle_diario.length > 0 ? (
              <div className="space-y-2">
                <h4 className="font-medium text-stone-900">Actividad Diaria</h4>
                {bitacora.detalle_diario.map((dia: any, idx: number) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-medium text-stone-900">
                        {new Date(dia.fecha).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-emerald-600">{dia.total_consultas || 0} consultas</span>
                      <span className="text-blue-600">{dia.total_recetas || 0} recetas</span>
                      <span className="text-purple-600">{dia.total_ordenes || 0} órdenes</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-stone-500 text-sm">
                No hay actividad registrada para este período
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-stone-500 text-sm">
            Error cargando bitácora
          </div>
        )}
      </ResponsiveCard>
    </div>
  );
}

function BDPacientesView({ deviceType, onSelectPaciente }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const handleSelectPaciente = async (paciente: any) => {
    try {
      // Obtener datos completos de la familia
      const familia = await AuthService.getFamiliaPorId(paciente.familia_id);
      const familiaData = {
        familia_id: familia.familia_id,
        apellido_principal: familia.apellido_principal,
        direccion: familia.direccion,
        barrio_vereda: familia.barrio_vereda,
        municipio: familia.municipio,
        telefono_contacto: familia.telefono_contacto
      };
      
      setSelectedPatient(paciente);
      
      if (onSelectPaciente) {
        onSelectPaciente(paciente, familiaData);
      }
    } catch (error) {
      console.error('Error cargando familia:', error);
      alert('Error al cargar datos de la familia');
    }
  };
  
  const handleBuscar = async (termino: string) => {
    if (!termino.trim()) {
      setResultados([]);
      return;
    }

    try {
      setLoading(true);
      const pacientes = await AuthService.buscarPacientes(termino);
      setResultados(pacientes || []);
    } catch (error) {
      console.error('Error buscando pacientes:', error);
      alert('Error al buscar pacientes');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    
    // Limpiar timeout anterior
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Búsqueda con debounce de 300ms
    searchTimeoutRef.current = setTimeout(() => {
      handleBuscar(value);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      handleBuscar(searchTerm);
    }
  };
  
  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <h3 className="font-semibold text-stone-900 mb-4">Buscar Pacientes</h3>
        
        <div className="space-y-4">
          <ResponsiveField label="Búsqueda">
            <div className="flex gap-2">
              <ResponsiveInput 
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Documento, nombre, apellido o familia..."
                className="flex-1"
              />
              <ResponsiveButton onClick={() => handleBuscar(searchTerm)} disabled={loading}>
                <Search className="w-4 h-4" />
              </ResponsiveButton>
            </div>
          </ResponsiveField>
        </div>
      </ResponsiveCard>
      
      {loading ? (
        <ResponsiveCard>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500 mx-auto"></div>
            <span className="ml-3 text-stone-600">Buscando...</span>
          </div>
        </ResponsiveCard>
      ) : resultados.length > 0 ? (
        <ResponsiveCard>
          <h4 className="font-semibold text-stone-900 mb-3">
            Resultados ({resultados.length})
          </h4>
          <div className="space-y-3">
            {resultados.map((paciente) => {
              const nombreCompleto = `${paciente.primer_nombre || ''} ${paciente.segundo_nombre || ''} ${paciente.primer_apellido || ''} ${paciente.segundo_apellido || ''}`.trim();
              return (
                <button
                  key={paciente.paciente_id}
                  onClick={() => handleSelectPaciente(paciente)}
                  className="w-full p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-stone-900 mb-1">{nombreCompleto}</div>
                      <div className="text-sm text-stone-600">
                        {paciente.tipo_documento} {paciente.numero_documento} • 
                        Familia {paciente.familia_apellido}
                        {paciente.familia_municipio && ` • ${paciente.familia_municipio}`}
                      </div>
                      {paciente.fecha_nacimiento && (
                        <div className="text-xs text-stone-500 mt-1">
                          Nacimiento: {new Date(paciente.fecha_nacimiento).toLocaleDateString('es-ES')}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-stone-400 ml-2" />
                  </div>
                </button>
              );
            })}
          </div>
        </ResponsiveCard>
      ) : searchTerm ? (
        <ResponsiveCard>
          <div className="text-center py-8 text-stone-500">
            <Search className="w-12 h-12 mx-auto mb-2 text-stone-300" />
            <p>No se encontraron pacientes</p>
            <p className="text-xs text-stone-400 mt-1">Intenta con otro término de búsqueda</p>
          </div>
        </ResponsiveCard>
      ) : null}
    </div>
  );
}

function DashboardEpidemioView({ deviceType }: any) {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const data = await AuthService.getDashboardEpidemio();
        setDashboard(data);
      } catch (error) {
        console.error('Error cargando dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <ResponsiveCard>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500 mx-auto"></div>
          <span className="ml-3 text-stone-600">Cargando dashboard...</span>
        </div>
      </ResponsiveCard>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <h3 className="font-semibold text-stone-900 mb-4">Dashboard Epidemiológico</h3>
        
        {dashboard ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">{dashboard.total_familias || 0}</div>
                <div className="text-xs text-stone-600">Familias</div>
              </div>
              <div className="p-4 bg-stone-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{dashboard.total_pacientes || 0}</div>
                <div className="text-xs text-stone-600">Pacientes</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{dashboard.total_atenciones || 0}</div>
                <div className="text-xs text-stone-600">Total Atenciones</div>
              </div>
              <div className="p-4 bg-stone-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">{dashboard.atenciones_mes || 0}</div>
                <div className="text-xs text-stone-600">Este Mes</div>
              </div>
            </div>

            {dashboard.diagnosticos_frecuentes && dashboard.diagnosticos_frecuentes.length > 0 && (
              <div>
                <h4 className="font-medium text-stone-900 mb-3">Diagnósticos Más Frecuentes</h4>
                <div className="space-y-2">
                  {dashboard.diagnosticos_frecuentes.slice(0, 5).map((diag: any, idx: number) => (
                    <div key={idx} className="p-3 bg-stone-50 rounded-lg flex items-center justify-between">
                      <span className="text-sm text-stone-900">{diag.diagnosticos_cie10 || 'N/A'}</span>
                      <ResponsiveBadge tone="health">{diag.frecuencia}</ResponsiveBadge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-stone-500 text-sm">
            No hay datos disponibles
          </div>
        )}
      </ResponsiveCard>
    </div>
  );
}

function ConfiguracionView({ deviceType }: any) {
  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <h3 className="font-semibold text-stone-900 mb-4">Configuración</h3>
        <div className="space-y-4">
          <div className="text-center py-8 text-stone-500 text-sm">
            Opciones de configuración próximamente
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
}

function AyudaView({ deviceType }: any) {
  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <h3 className="font-semibold text-stone-900 mb-4">Ayuda y Soporte</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-stone-900 mb-2">Preguntas Frecuentes</h4>
            <div className="text-sm text-stone-600">
              <p className="mb-2">• ¿Cómo crear una nueva consulta médica?</p>
              <p className="mb-2">• ¿Cómo generar una receta?</p>
              <p className="mb-2">• ¿Cómo buscar pacientes?</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-stone-900 mb-2">Contacto</h4>
            <div className="text-sm text-stone-600">
              <p>Para soporte técnico, contacta al administrador del sistema.</p>
            </div>
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
}

function CrearFamiliaView({ deviceType }: any) {
  const [form, setForm] = useState({
    apellido_principal: '',
    direccion: '',
    barrio_vereda: '',
    municipio: '',
    telefono_contacto: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const user = AuthService.getCurrentUser();

  const handleChange = (field: string) => (e: any) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await AuthService.crearFamilia({
        apellido_principal: form.apellido_principal,
        direccion: form.direccion,
        barrio_vereda: form.barrio_vereda || null,
        municipio: form.municipio,
        telefono_contacto: form.telefono_contacto || null,
        creado_por_uid: Number(user?.id)
      });
      setForm({ apellido_principal: '', direccion: '', barrio_vereda: '', municipio: '', telefono_contacto: '' });
      alert('Familia creada exitosamente');
    } catch (e: any) {
      setSubmitError(e?.message || 'Error al guardar la familia');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <h3 className="font-semibold text-stone-900 mb-4">Nueva Familia</h3>
        
        <div className="space-y-4">
          <ResponsiveField label="Jefe de familia" required>
            <ResponsiveInput placeholder="Apellido principal" value={form.apellido_principal} onChange={handleChange('apellido_principal')} />
          </ResponsiveField>
          
          <div className={`grid gap-3 ${deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <ResponsiveField label="Barrio/Vereda">
              <ResponsiveInput placeholder="Barrio o vereda" value={form.barrio_vereda} onChange={handleChange('barrio_vereda')} />
            </ResponsiveField>
            <ResponsiveField label="Municipio" required>
              <ResponsiveInput placeholder="Municipio" value={form.municipio} onChange={handleChange('municipio')} />
            </ResponsiveField>
          </div>
          
          <ResponsiveField label="Dirección" required>
            <ResponsiveInput placeholder="Dirección completa" value={form.direccion} onChange={handleChange('direccion')} />
          </ResponsiveField>
          
          <div className={`grid gap-3 ${deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <ResponsiveField label="Teléfono">
              <ResponsiveInput type="tel" placeholder="Teléfono" value={form.telefono_contacto} onChange={handleChange('telefono_contacto')} />
            </ResponsiveField>
            <div />
          </div>
          
          {submitError && <div className="text-sm text-red-600">{submitError}</div>}
          
          <div className="pt-4">
            <ResponsiveButton 
              variant="primary" 
              className="w-full" 
              onClick={handleSubmit} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Nueva Familia'}
            </ResponsiveButton>
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
}

// Vista: Formulario de Caracterización
function FormularioCaracterizacionView({ familia, caracterizacionExistente, onSave, onCancel }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<any>({
    // Datos familiares
    numero_ficha: '',
    zona: 'Urbana',
    territorio: '',
    estrato: null,
    tipo_familia: '',
    riesgo_familiar: '',
    fecha_caracterizacion: new Date().toISOString().split('T')[0],
    info_vivienda: {
      funcionalidad: [],
      sobrecarga: [],
      ecomapa: [],
      observaciones: '',
      te_quiere: false,
      nn_discapacidad_adulto_mayor_enfermedad: false
    },
    situaciones_proteccion: [],
    condiciones_salud_publica: [],
    practicas_cuidado: {
      hab_saludables: false,
      rec_socioemoc: false,
      cuidado_y_protec: false,
      relaciones_sanas: false,
      red_colect: false,
      autonomia_adu_mayor: false,
      pract_prevencion_e: false,
      prac_saberes_anc: false,
      prac_derech: false
    },
    // Datos de integrantes
    integrantes: []
  });
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState<any[]>([]);

  // Cargar datos existentes y pacientes
  useEffect(() => {
    const loadData = async () => {
      try {
        const pacientesData = await AuthService.getPacientesByFamilia(familia.familia_id);
        setPacientes(pacientesData);
        
        // Inicializar formulario de integrantes
        const integrantesForm = pacientesData.map((p: any) => ({
          paciente_id: p.paciente_id,
          fecha_caracterizacion: new Date().toISOString().split('T')[0],
          rol_familiar: '',
          ocupacion: '',
          nivel_educativo: '',
          grupo_poblacional: '',
          regimen_afiliacion: '',
          pertenencia_etnica: '',
          discapacidad: [],
          victima_violencia: false,
          datos_pyp: {},
          datos_salud: {}
        }));
        
        setFormData(prev => ({
          ...prev,
          integrantes: integrantesForm
        }));
        
        // Si hay caracterización existente, cargarla
        if (caracterizacionExistente?.tiene_caracterizacion) {
          const familiaData = caracterizacionExistente.familia;
          setFormData(prev => ({
            ...prev,
            numero_ficha: familiaData.numero_ficha || '',
            zona: familiaData.zona || 'Urbana',
            territorio: familiaData.territorio || '',
            estrato: familiaData.estrato || null,
            tipo_familia: familiaData.tipo_familia || '',
            riesgo_familiar: familiaData.riesgo_familiar || '',
            fecha_caracterizacion: familiaData.fecha_caracterizacion || new Date().toISOString().split('T')[0],
            info_vivienda: familiaData.info_vivienda || prev.info_vivienda,
            situaciones_proteccion: familiaData.situaciones_proteccion || [],
            condiciones_salud_publica: familiaData.condiciones_salud_publica || [],
            practicas_cuidado: familiaData.practicas_cuidado || prev.practicas_cuidado
          }));
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };
    
    loadData();
  }, [familia.familia_id, caracterizacionExistente]);

  const tabs = [
    { key: 'ubicacion', label: 'Ubicación', icon: MapPin },
    { key: 'estructura', label: 'Estructura Familiar', icon: Users },
    { key: 'proteccion', label: 'Protección y Salud', icon: Shield },
    { key: 'practicas', label: 'Prácticas de Cuidado', icon: Heart },
    { key: 'integrantes', label: 'Integrantes', icon: User }
  ];

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const payload = {
        familia_id: familia.familia_id,
        datos_familia: {
          numero_ficha: formData.numero_ficha,
          zona: formData.zona,
          territorio: formData.territorio,
          estrato: formData.estrato,
          tipo_familia: formData.tipo_familia,
          riesgo_familiar: formData.riesgo_familiar,
          fecha_caracterizacion: formData.fecha_caracterizacion,
          info_vivienda: formData.info_vivienda,
          situaciones_proteccion: formData.situaciones_proteccion,
          condiciones_salud_publica: formData.condiciones_salud_publica,
          practicas_cuidado: formData.practicas_cuidado
        },
        integrantes: formData.integrantes
      };
      
      await AuthService.crearCaracterizacion(payload);
      
      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.error('Error guardando caracterización:', error);
      alert('Error al guardar la caracterización. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateIntegrante = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      integrantes: prev.integrantes.map((integrante, i) => 
        i === index ? { ...integrante, [field]: value } : integrante
      )
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Ubicación
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResponsiveField label="Número de Ficha">
                <ResponsiveInput
                  value={formData.numero_ficha}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, numero_ficha: e.target.value }))}
                  placeholder="Ej: 14250"
                />
              </ResponsiveField>
              <ResponsiveField label="Zona">
                <ResponsiveSelect
                  value={formData.zona}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, zona: e.target.value }))}
                  options={[
                    { value: 'Urbana', label: 'Urbana' },
                    { value: 'Rural', label: 'Rural' }
                  ]}
                />
              </ResponsiveField>
              <ResponsiveField label="Territorio/Comuna">
                <ResponsiveInput
                  value={formData.territorio}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, territorio: e.target.value }))}
                  placeholder="Ej: Comuna 19"
                />
              </ResponsiveField>
              <ResponsiveField label="Estrato">
                <ResponsiveInput
                  type="number"
                  value={formData.estrato || ''}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, estrato: parseInt(e.target.value) || null }))}
                  placeholder="1-6"
                />
              </ResponsiveField>
            </div>
          </div>
        );

      case 1: // Estructura Familiar
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResponsiveField label="Tipo de Familia">
                <ResponsiveSelect
                  value={formData.tipo_familia}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, tipo_familia: e.target.value }))}
                  options={[
                    { value: '', label: 'Seleccionar...' },
                    { value: 'Biparental', label: 'Biparental' },
                    { value: 'Monoparental', label: 'Monoparental' },
                    { value: 'Ext. Bipar', label: 'Extendida Biparental' },
                    { value: 'Ext. Monop', label: 'Extendida Monoparental' },
                    { value: 'Comp. Bipa', label: 'Compuesta Biparental' },
                    { value: 'Comp. Monop', label: 'Compuesta Monoparental' },
                    { value: 'Uniper', label: 'Unipersonal' }
                  ]}
                />
              </ResponsiveField>
              <ResponsiveField label="Riesgo Familiar">
                <ResponsiveSelect
                  value={formData.riesgo_familiar}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, riesgo_familiar: e.target.value }))}
                  options={[
                    { value: '', label: 'Seleccionar...' },
                    { value: '1. Ausencia', label: '1. Ausencia' },
                    { value: '2. Sobrecarga', label: '2. Sobrecarga' },
                    { value: '3. Sobrecarga Intensa', label: '3. Sobrecarga Intensa' },
                    { value: '0 a 3 Disfunción', label: '0 a 3 Disfunción' },
                    { value: '4 a 6 Func. Mode', label: '4 a 6 Funcional Moderada' },
                    { value: '7 a 10 Alta Func', label: '7 a 10 Alta Funcionalidad' }
                  ]}
                />
              </ResponsiveField>
            </div>
            
            <ResponsiveField label="Observaciones">
              <textarea
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm resize-none"
                rows={3}
                value={formData.info_vivienda.observaciones}
                onChange={(e: any) => updateFormData('info_vivienda', 'observaciones', e.target.value)}
                placeholder="Observaciones adicionales..."
              />
            </ResponsiveField>
          </div>
        );

      case 2: // Protección y Salud
        return (
          <div className="space-y-4">
            <ResponsiveField label="Situaciones de Especial Protección">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['NNA', 'GESTANTES', 'ADULTOS MAYORES', 'TB', 'LEPRA', 'ESCABIOSIS', 'MALARIA', 'DENGUE', 'CHAGAS'].map(option => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.situaciones_proteccion.includes(option)}
                      onChange={(e: any) => {
                        const newValue = e.target.checked
                          ? [...formData.situaciones_proteccion, option]
                          : formData.situaciones_proteccion.filter((item: string) => item !== option);
                        setFormData(prev => ({ ...prev, situaciones_proteccion: newValue }));
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </ResponsiveField>
          </div>
        );

      case 3: // Prácticas de Cuidado
        return (
          <div className="space-y-4">
            <ResponsiveField label="Prácticas Protectoras">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.practicas_cuidado).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={value as boolean}
                      onChange={(e: any) => updateFormData('practicas_cuidado', key, e.target.checked)}
                    />
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </label>
                ))}
              </div>
            </ResponsiveField>
          </div>
        );

      case 4: // Integrantes
        return (
          <div className="space-y-4">
            {pacientes.map((paciente, index) => (
              <ResponsiveCard key={paciente.paciente_id}>
                <h5 className="font-medium text-stone-900 mb-3">
                  {paciente.primer_nombre} {paciente.primer_apellido}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResponsiveField label="Rol Familiar">
                    <ResponsiveSelect
                      value={formData.integrantes[index]?.rol_familiar || ''}
                      onChange={(e: any) => updateIntegrante(index, 'rol_familiar', e.target.value)}
                      options={[
                        { value: '', label: 'Seleccionar...' },
                        { value: 'Jefe', label: 'Jefe' },
                        { value: 'Cónyuge', label: 'Cónyuge' },
                        { value: 'Hijo', label: 'Hijo' },
                        { value: 'Hermano', label: 'Hermano' },
                        { value: 'Padre', label: 'Padre' },
                        { value: 'Otro', label: 'Otro' }
                      ]}
                    />
                  </ResponsiveField>
                  <ResponsiveField label="Ocupación">
                    <ResponsiveInput
                      value={formData.integrantes[index]?.ocupacion || ''}
                      onChange={(e: any) => updateIntegrante(index, 'ocupacion', e.target.value)}
                      placeholder="Ocupación actual"
                    />
                  </ResponsiveField>
                  <ResponsiveField label="Nivel Educativo">
                    <ResponsiveInput
                      value={formData.integrantes[index]?.nivel_educativo || ''}
                      onChange={(e: any) => updateIntegrante(index, 'nivel_educativo', e.target.value)}
                      placeholder="Ej: Primaria, Bachillerato, Universitario"
                    />
                  </ResponsiveField>
                  <ResponsiveField label="Grupo Poblacional">
                    <ResponsiveSelect
                      value={formData.integrantes[index]?.grupo_poblacional || ''}
                      onChange={(e: any) => updateIntegrante(index, 'grupo_poblacional', e.target.value)}
                      options={[
                        { value: '', label: 'Seleccionar...' },
                        { value: 'NNA', label: 'Niño, Niña, Adolescente' },
                        { value: 'Gestante', label: 'Gestante' },
                        { value: 'Adulto Mayor', label: 'Adulto Mayor' }
                      ]}
                    />
                  </ResponsiveField>
                </div>
              </ResponsiveCard>
            ))}
          </div>
        );

      default:
        return <div>Contenido no disponible</div>;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <ResponsiveCard>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-stone-900">Caracterización de Familia</h3>
            <div className="text-sm text-stone-600">{familia.apellido_principal}</div>
          </div>
          <div className="flex gap-3">
            <ResponsiveButton variant="secondary" onClick={onCancel}>
              Cancelar
            </ResponsiveButton>
            <ResponsiveButton onClick={handleSave} disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Caracterización'}
            </ResponsiveButton>
          </div>
        </div>
      </ResponsiveCard>

      {/* Tabs */}
      <ResponsiveCard>
        <div className="flex gap-1 bg-stone-100 rounded-lg p-1 mb-6">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(index)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === index
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Contenido del tab activo */}
        {renderTabContent()}
      </ResponsiveCard>
    </div>
  );
}

// Vista: Plan de Cuidado Familiar
function PlanCuidadoView({ paciente, familia, onBack }: any) {
  const { user } = useAuth();
  const isAuxiliar = (user?.role === 'auxiliar_enfermeria');
  const isMedico = (user?.role === 'medico');
  const canCreatePlan = isAuxiliar || isMedico;
  const [planes, setPlanes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>({
    fecha_entrega: new Date().toISOString().split('T')[0],
    plan_asociado: [],
    condicion_identificada: '',
    logro_salud: '',
    cuidados_salud: '',
    demandas_inducidas_desc: '',
    educacion_salud: '',
    estado: 'Activo',
    fecha_aceptacion: ''
  });

  const loadPlanes = async () => {
    try {
      setLoading(true);
      const data = await AuthService.getPlanesCuidadoPaciente(paciente.paciente_id);
      setPlanes(data);
    } catch (error) {
      console.error('Error cargando planes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPlanes(); }, [paciente.paciente_id]);

  const handleSave = async () => {
    try {
      const user = AuthService.getCurrentUser();
      await AuthService.crearPlanCuidado({
        ...form,
        familia_id: familia.familia_id,
        paciente_principal_id: paciente.paciente_id,
        creado_por_uid: Number(user?.id) || 1
      });
      setShowForm(false);
      await loadPlanes();
    } catch (error) {
      console.error('Error guardando plan:', error);
      alert('Error al guardar el plan de cuidado');
    }
  };

  const togglePlanAsociado = (opcion: string) => {
    setForm(prev => ({
      ...prev,
      plan_asociado: prev.plan_asociado.includes(opcion)
        ? prev.plan_asociado.filter((item: string) => item !== opcion)
        : [...prev.plan_asociado, opcion]
    }));
  };

  if (loading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <ResponsiveCard>
          <div className="text-center py-8">
            <div className="text-sm text-stone-500">Cargando planes de cuidado...</div>
          </div>
        </ResponsiveCard>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <ResponsiveCard>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-stone-900">Plan de Cuidado Familiar</h3>
            <div className="text-sm text-stone-600">
              {paciente.primer_nombre} {paciente.primer_apellido} • {familia.apellido_principal}
            </div>
          </div>
          <div className="flex gap-3">
            <ResponsiveButton variant="secondary" onClick={onBack}>
              Volver
            </ResponsiveButton>
            {canCreatePlan && (
              <ResponsiveButton onClick={() => setShowForm(true)}>
                Nuevo Plan
              </ResponsiveButton>
            )}
          </div>
        </div>
      </ResponsiveCard>

      {/* Lista de planes existentes */}
      {planes.length > 0 ? (
        <div className="space-y-4">
          {planes.map((plan) => (
            <ResponsiveCard key={plan.plan_id}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-stone-900">{plan.condicion_identificada}</h4>
                  <div className="text-sm text-stone-600">
                    {plan.estado}
                  </div>
                  <div className="text-xs text-stone-500">
                    Entregado: {new Date(plan.fecha_entrega).toLocaleDateString()}
                    {plan.fecha_aceptacion && (
                      <> • Aceptado: {new Date(plan.fecha_aceptacion).toLocaleDateString()}</>
                    )}
                  </div>
                </div>
                <ResponsiveBadge tone={plan.estado === 'Activo' ? 'health' : 'neutral'}>
                  {plan.estado}
                </ResponsiveBadge>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-stone-500">Logro en salud a establecerse</div>
                  <div className="text-sm text-stone-900">{plan.logro_salud}</div>
                </div>
                
                <div>
                  <div className="text-xs text-stone-500">Cuidados de la salud</div>
                  <div className="text-sm text-stone-900">{plan.cuidados_salud}</div>
                </div>
                
                {plan.plan_asociado && plan.plan_asociado.length > 0 && (
                  <div>
                    <div className="text-xs text-stone-500">Plan familiar asociado</div>
                    <div className="text-sm text-stone-900">
                      {plan.plan_asociado.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            </ResponsiveCard>
          ))}
        </div>
      ) : (
        <ResponsiveCard>
          <div className="text-center py-8">
            <div className="text-sm text-stone-500 mb-2">No hay planes de cuidado registrados</div>
            <div className="text-xs text-stone-400">
              Crea el primer plan de cuidado para este paciente
            </div>
          </div>
        </ResponsiveCard>
      )}

      {/* Formulario de nuevo plan */}
      {showForm && (
        <ResponsiveCard>
          <h4 className="font-semibold text-stone-900 mb-4">Nuevo Plan de Cuidado</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResponsiveField label="Fecha de Entrega" required>
                <ResponsiveInput
                  type="date"
                  value={form.fecha_entrega}
                  onChange={(e: any) => setForm(prev => ({ ...prev, fecha_entrega: e.target.value }))}
                />
              </ResponsiveField>
              <ResponsiveField label="Fecha de Aceptación">
                <ResponsiveInput
                  type="date"
                  value={form.fecha_aceptacion}
                  onChange={(e: any) => setForm(prev => ({ ...prev, fecha_aceptacion: e.target.value }))}
                />
              </ResponsiveField>
            </div>

            <ResponsiveField label="Condición/Situación Identificada" required>
              <textarea
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm resize-none"
                rows={3}
                value={form.condicion_identificada}
                onChange={(e: any) => setForm(prev => ({ ...prev, condicion_identificada: e.target.value }))}
                placeholder="Describe la condición o situación identificada..."
              />
            </ResponsiveField>

            <ResponsiveField label="Logro en salud a establecerse" required>
              <textarea
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm resize-none"
                rows={3}
                value={form.logro_salud}
                onChange={(e: any) => setForm(prev => ({ ...prev, logro_salud: e.target.value }))}
                placeholder="Describe el logro en salud que se quiere establecer..."
              />
            </ResponsiveField>

            <ResponsiveField label="Cuidados de la salud">
              <textarea
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm resize-none"
                rows={3}
                value={form.cuidados_salud}
                onChange={(e: any) => setForm(prev => ({ ...prev, cuidados_salud: e.target.value }))}
                placeholder="Describe los cuidados de salud necesarios..."
              />
            </ResponsiveField>

            <ResponsiveField label="Demandas inducidas">
              <textarea
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm resize-none"
                rows={2}
                value={form.demandas_inducidas_desc}
                onChange={(e: any) => setForm(prev => ({ ...prev, demandas_inducidas_desc: e.target.value }))}
                placeholder="Describe las demandas inducidas..."
              />
            </ResponsiveField>

            <ResponsiveField label="Educación en salud">
              <textarea
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm resize-none"
                rows={2}
                value={form.educacion_salud}
                onChange={(e: any) => setForm(prev => ({ ...prev, educacion_salud: e.target.value }))}
                placeholder="Describe la educación en salud necesaria..."
              />
            </ResponsiveField>

            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Plan familiar asociado</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Hábitos saludables',
                  'Cuidado gestante lactante',
                  'Nutrición infantil y desparasitación',
                  'Envejecimiento saludable',
                  'Planificación familiar',
                  'Enfermedades crónicas',
                  'Cuidado menor de 5 años',
                  'Prevención dengue',
                  'EDA',
                  'IRA',
                  'Osteomuscular',
                  'ITS',
                  'Salud sexual en la adolescencia',
                  'Nutrición adultos',
                  'Salud mental',
                  'Prevención violencias',
                  'Otros'
                ].map((opcion) => (
                  <label key={opcion} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-stone-300"
                      checked={form.plan_asociado.includes(opcion)}
                      onChange={() => togglePlanAsociado(opcion)}
                    />
                    <span>{opcion}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <ResponsiveButton variant="secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </ResponsiveButton>
              <ResponsiveButton onClick={handleSave}>
                Guardar Plan
              </ResponsiveButton>
            </div>
          </div>
        </ResponsiveCard>
      )}
    </div>
  );
}

// Vista: Demandas Inducidas
function DemandasInducidasView({ paciente, familia, onBack }: any) {
  const { user } = useAuth();
  const isAuxiliar = (user?.role === 'auxiliar_enfermeria');
  const isMedico = (user?.role === 'medico');
  const canCreateDemanda = isAuxiliar || isMedico;
  const [demandas, setDemandas] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profesionalesDisponibles, setProfesionalesDisponibles] = useState<any>({});
  const [loadingProfesionales, setLoadingProfesionales] = useState<any>({});
  const [tiposProfesionalesSeleccionados, setTiposProfesionalesSeleccionados] = useState<string[]>([]);
  
  const tiposProfesionales = [
    { id: 'Médico', nombre: 'Médico' },
    { id: 'Enfermero', nombre: 'Enfermero' },
    { id: 'Psicólogo', nombre: 'Psicólogo' },
    { id: 'Fisioterapeuta', nombre: 'Fisioterapeuta' },
    { id: 'Nutricionista', nombre: 'Nutricionista' },
    { id: 'Fonoaudiólogo', nombre: 'Fonoaudiólogo' },
    { id: 'Odontólogo', nombre: 'Odontólogo' }
  ];
  
  const [form, setForm] = useState<any>({
    numero_formulario: '',
    fecha_demanda: new Date().toISOString().split('T')[0],
    diligenciamiento: [],
    remision_a: {
      profesionales: [],
      examenes_laboratorio: []
    },
    estado: 'Pendiente',
    asignado_a_uid: null,
    seguimiento: {}
  });

  const loadDemandas = async () => {
    try {
      setLoading(true);
      const data = await AuthService.getDemandasInducidasPaciente(paciente.paciente_id);
      setDemandas(data);
    } catch (error) {
      console.error('Error cargando demandas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDemandas();
  }, [paciente.paciente_id]);

  // Cargar profesionales cuando se selecciona un tipo
  useEffect(() => {
    const cargarProfesionales = async (tipo: string) => {
      if (profesionalesDisponibles[tipo] || loadingProfesionales[tipo]) return;
      
      setLoadingProfesionales((prev: any) => ({ ...prev, [tipo]: true }));
      try {
        const usuarios = await AuthService.getUsuariosPorRol(tipo);
        setProfesionalesDisponibles((prev: any) => ({ ...prev, [tipo]: usuarios }));
      } catch (error) {
        console.error(`Error cargando profesionales ${tipo}:`, error);
        setProfesionalesDisponibles((prev: any) => ({ ...prev, [tipo]: [] }));
      } finally {
        setLoadingProfesionales((prev: any) => ({ ...prev, [tipo]: false }));
      }
    };

    tiposProfesionalesSeleccionados.forEach(tipo => {
      cargarProfesionales(tipo);
    });
  }, [tiposProfesionalesSeleccionados]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDemanda = async () => {
    try {
      // Si hay profesionales asignados, usar el primero como asignado_a_uid (para compatibilidad)
      let asignadoAId = null;
      if (form.remision_a.profesionales && form.remision_a.profesionales.length > 0) {
        asignadoAId = form.remision_a.profesionales[0].profesional_id;
      }
      
      const newDemanda = {
        ...form,
        paciente_id: paciente.paciente_id,
        solicitado_por_uid: Number(user?.id) || 1,
        asignado_a_uid: asignadoAId,
        remision_a: form.remision_a // El backend lo convertirá a JSON string
      };
      await AuthService.crearDemandaInducida(newDemanda);
      setShowForm(false);
      setForm({
        numero_formulario: '',
        fecha_demanda: new Date().toISOString().split('T')[0],
        diligenciamiento: [],
        remision_a: {
          profesionales: [],
          examenes_laboratorio: []
        },
        estado: 'Pendiente',
        asignado_a_uid: null,
        seguimiento: {}
      });
      setTiposProfesionalesSeleccionados([]);
      setProfesionalesDisponibles({});
      loadDemandas();
    } catch (error) {
      console.error('Error guardando demanda:', error);
      alert('Error guardando demanda. Verifique la consola.');
    }
  };

  const toggleTipoProfesional = (tipo: string) => {
    if (tiposProfesionalesSeleccionados.includes(tipo)) {
      setTiposProfesionalesSeleccionados(tiposProfesionalesSeleccionados.filter(t => t !== tipo));
      // Remover profesionales de ese tipo del form
      setForm((prev: any) => ({
        ...prev,
        remision_a: {
          ...prev.remision_a,
          profesionales: prev.remision_a.profesionales.filter((p: any) => p.tipo !== tipo)
        }
      }));
    } else {
      setTiposProfesionalesSeleccionados([...tiposProfesionalesSeleccionados, tipo]);
    }
  };

  const handleProfesionalChange = (tipo: string, profesionalId: string) => {
    const profesional = profesionalesDisponibles[tipo]?.find((p: any) => p.usuario_id.toString() === profesionalId);
    if (!profesional) return;
    
    setForm((prev: any) => {
      const profesionales = prev.remision_a.profesionales.filter((p: any) => p.tipo !== tipo);
      profesionales.push({
        tipo,
        profesional_id: profesional.usuario_id,
        nombre: profesional.nombre_completo
      });
      
      return {
        ...prev,
        remision_a: {
          ...prev.remision_a,
          profesionales
        }
      };
    });
  };

  const handleExamenesChange = (examenes: string[]) => {
    setForm((prev: any) => ({
      ...prev,
      remision_a: {
        ...prev.remision_a,
        examenes_laboratorio: examenes
      }
    }));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setForm({
      numero_formulario: '',
      fecha_demanda: new Date().toISOString().split('T')[0],
      diligenciamiento: [],
      remision_a: {
        profesionales: [],
        examenes_laboratorio: []
      },
      estado: 'Pendiente',
      asignado_a_uid: null,
      seguimiento: {}
    });
    setTiposProfesionalesSeleccionados([]);
    setProfesionalesDisponibles({});
  };

  if (loading) {
    return (
      <ResponsiveCard>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bondi-500"></div>
          <span className="ml-3 text-stone-600">Cargando demandas...</span>
        </div>
      </ResponsiveCard>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <ResponsiveCard>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-stone-900">Demandas Inducidas</h3>
            <div className="text-sm text-stone-600">
              {paciente.primer_nombre} {paciente.primer_apellido} • {familia.apellido_principal}
            </div>
          </div>
          <div className="flex gap-3">
            <ResponsiveButton variant="secondary" onClick={onBack}>
              Volver
            </ResponsiveButton>
            {canCreateDemanda && (
              <ResponsiveButton onClick={() => setShowForm(true)}>
                Crear Demanda
              </ResponsiveButton>
            )}
          </div>
        </div>
      </ResponsiveCard>

      {showForm && (
        <ResponsiveCard>
          <h4 className="font-semibold text-stone-900 mb-4">Nueva Demanda Inducida</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResponsiveField label="Número de Formulario">
                <ResponsiveInput
                  type="text"
                  name="numero_formulario"
                  value={form.numero_formulario}
                  onChange={handleFormChange}
                  placeholder="Ej: 29251"
                />
              </ResponsiveField>
              <ResponsiveField label="Fecha de Demanda">
                <ResponsiveInput
                  type="date"
                  name="fecha_demanda"
                  value={form.fecha_demanda}
                  onChange={handleFormChange}
                />
              </ResponsiveField>
              <ResponsiveField label="Estado">
                <select
                  name="estado"
                  value={form.estado}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Asignada">Asignada</option>
                  <option value="Realizada">Realizada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </ResponsiveField>
            </div>

            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Diligenciamiento</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Atención para el cuidado preconcepcional',
                  'Planificación familiar',
                  'Control prenatal',
                  'Control puerperal',
                  'Crecimiento y desarrollo',
                  'Vacunación',
                  'Nutrición infantil',
                  'Salud oral',
                  'Salud mental',
                  'Enfermedades crónicas'
                ].map((opcion) => (
                  <label key={opcion} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-stone-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm(prev => ({
                            ...prev,
                            diligenciamiento: [...prev.diligenciamiento, opcion]
                          }));
                        } else {
                          setForm(prev => ({
                            ...prev,
                            diligenciamiento: prev.diligenciamiento.filter((item: string) => item !== opcion)
                          }));
                        }
                      }}
                    />
                    <span>{opcion}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Selección de profesionales del equipo básico */}
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">
                Remisión a profesionales del equipo básico
              </label>
              <div className="space-y-3">
                {/* Checkboxes para seleccionar tipos de profesionales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {tiposProfesionales.map((tipo) => (
                    <label key={tipo.id} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        className="rounded border-stone-300"
                        checked={tiposProfesionalesSeleccionados.includes(tipo.id)}
                        onChange={() => toggleTipoProfesional(tipo.id)}
                      />
                      <span>{tipo.nombre}</span>
                    </label>
                  ))}
                </div>
                
                {/* Desplegables para profesionales según tipo seleccionado */}
                {tiposProfesionalesSeleccionados.map((tipo) => {
                  const profesionales = profesionalesDisponibles[tipo] || [];
                  const profesionalSeleccionado = form.remision_a.profesionales.find((p: any) => p.tipo === tipo);
                  
                  return (
                    <div key={tipo} className="space-y-1">
                      <label className="text-xs font-medium text-stone-600">{tipo}</label>
                      {loadingProfesionales[tipo] ? (
                        <div className="text-xs text-stone-500">Cargando profesionales...</div>
                      ) : profesionales.length > 0 ? (
                        <select
                          value={profesionalSeleccionado?.profesional_id?.toString() || ''}
                          onChange={(e) => handleProfesionalChange(tipo, e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm"
                        >
                          <option value="">Seleccione un {tipo.toLowerCase()}</option>
                          {profesionales.map((prof: any) => (
                            <option key={prof.usuario_id} value={prof.usuario_id.toString()}>
                              {prof.nombre_completo}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-xs text-stone-500">No hay {tipo.toLowerCase()}s disponibles</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exámenes y pruebas de laboratorio */}
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">
                Exámenes y pruebas de laboratorio
              </label>
              <textarea
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eden-500 focus:border-eden-500 text-sm resize-none"
                rows={4}
                placeholder="Ingrese los exámenes y pruebas de laboratorio solicitadas (uno por línea o separados por comas)..."
                value={Array.isArray(form.remision_a.examenes_laboratorio) 
                  ? form.remision_a.examenes_laboratorio.join('\n')
                  : (typeof form.remision_a.examenes_laboratorio === 'string' ? form.remision_a.examenes_laboratorio : '')}
                onChange={(e) => {
                  const examenes = e.target.value.split('\n').map(line => line.trim()).filter(line => line);
                  handleExamenesChange(examenes);
                }}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <ResponsiveButton variant="secondary" onClick={handleCancelForm}>
                Cancelar
              </ResponsiveButton>
              <ResponsiveButton onClick={handleSaveDemanda}>
                Guardar Demanda
              </ResponsiveButton>
            </div>
          </div>
        </ResponsiveCard>
      )}

      <ResponsiveCard>
        <h4 className="font-semibold text-stone-900 mb-3">Demandas Registradas</h4>
        {demandas.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-sm text-stone-500 mb-2">No hay demandas inducidas registradas</div>
            <div className="text-xs text-stone-400">
              Crea la primera demanda inducida para este paciente
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {demandas.map((demanda) => (
              <div key={demanda.demanda_id} className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-stone-900">
                      Formulario #{demanda.numero_formulario || demanda.demanda_id}
                    </div>
                    <div className="text-sm text-stone-600">
                      Fecha: {new Date(demanda.fecha_demanda).toLocaleDateString()}
                    </div>
                  </div>
                  <ResponsiveBadge tone={demanda.estado === 'Realizada' ? 'success' : demanda.estado === 'Pendiente' ? 'warning' : 'info'}>
                    {demanda.estado}
                  </ResponsiveBadge>
                </div>
                
                {demanda.diligenciamiento && demanda.diligenciamiento.length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs text-stone-500 mb-1">Diligenciamiento:</div>
                    <div className="text-sm text-stone-700">
                      {demanda.diligenciamiento.join(', ')}
                    </div>
                  </div>
                )}
                
                {(() => {
                  let remisionData = demanda.remision_a;
                  // Si viene como string JSON, parsearlo
                  if (typeof remisionData === 'string') {
                    try {
                      remisionData = JSON.parse(remisionData);
                    } catch (e) {
                      // Si no es JSON válido, tratar como array simple (formato antiguo)
                      try {
                        remisionData = typeof demanda.remision_a === 'string' 
                          ? JSON.parse(demanda.remision_a) 
                          : demanda.remision_a;
                      } catch (e2) {
                        remisionData = { profesionales: [], examenes_laboratorio: [] };
                      }
                    }
                  }
                  
                  const profesionales = remisionData?.profesionales || [];
                  const examenes = remisionData?.examenes_laboratorio || [];
                  const remisionSimple = Array.isArray(remisionData) ? remisionData : [];
                  
                  return (
                    <>
                      {profesionales.length > 0 && (
                        <div className="mb-2">
                          <div className="text-xs text-stone-500 mb-1">Profesionales asignados:</div>
                          <div className="text-sm text-stone-700">
                            {profesionales.map((p: any) => (
                              <div key={p.profesional_id}>
                                {p.tipo}: {p.nombre}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {examenes.length > 0 && (
                        <div className="mb-2">
                          <div className="text-xs text-stone-500 mb-1">Exámenes de laboratorio:</div>
                          <div className="text-sm text-stone-700">
                            {Array.isArray(examenes) ? examenes.join(', ') : examenes}
                          </div>
                        </div>
                      )}
                      {remisionSimple.length > 0 && profesionales.length === 0 && (
                        <div className="mb-2">
                          <div className="text-xs text-stone-500 mb-1">Remisión a:</div>
                          <div className="text-sm text-stone-700">
                            {remisionSimple.join(', ')}
                          </div>
                        </div>
                      )}
                      {demanda.asignado_a_nombre && (
                        <div className="text-xs text-stone-500">
                          Asignado a: {demanda.asignado_a_nombre}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ))}
          </div>
        )}
      </ResponsiveCard>
    </div>
  );
}

// Componente principal
export default function App() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [currentRole, setCurrentRole] = useState("medico");
  const [currentPage, setCurrentPage] = useState("inicio");
  const [selectedFamilia, setSelectedFamilia] = useState<any | null>(null);
  const [selectedPaciente, setSelectedPaciente] = useState<any | null>(null);
  const [showPlanCuidado, setShowPlanCuidado] = useState(false);
  const [showDemandasInducidas, setShowDemandasInducidas] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const deviceType = useDeviceType();

  // Listeners para navegación
  useEffect(() => {
    const handlerFamilia = (e: any) => {
      setSelectedFamilia(e.detail);
      setCurrentPage('familia-detalle');
    };

    const handlerPlanesCuidado = (e: any) => {
      setSelectedPaciente(e.detail.paciente);
      setSelectedFamilia(e.detail.familia);
      setShowPlanCuidado(true);
    };

    const handlerDemandasInducidas = (e: any) => {
      setSelectedPaciente(e.detail.paciente);
      setSelectedFamilia(e.detail.familia);
      setShowDemandasInducidas(true);
    };

    window.addEventListener('openFamiliaDetalle', handlerFamilia as any);
    window.addEventListener('openPlanesCuidado', handlerPlanesCuidado as any);
    window.addEventListener('openDemandasInducidas', handlerDemandasInducidas as any);
    
    return () => {
      window.removeEventListener('openFamiliaDetalle', handlerFamilia as any);
      window.removeEventListener('openPlanesCuidado', handlerPlanesCuidado as any);
      window.removeEventListener('openDemandasInducidas', handlerDemandasInducidas as any);
    };
  }, []);
  
  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} isLoading={isLoading} />;
  }

  // Usar el rol del usuario autenticado
  const userRole = user?.role || currentRole;
  const roleConfig = USER_ROLES[userRole as keyof typeof USER_ROLES] || USER_ROLES['medico'];
  const RoleIcon = roleConfig.icon;

  const renderPage = () => {
    // Manejar vistas especiales que no están en currentPage
    if (showPlanCuidado && selectedPaciente && selectedFamilia) {
      return (
        <PlanCuidadoView
          paciente={selectedPaciente}
          familia={selectedFamilia}
          onBack={() => {
            setShowPlanCuidado(false);
            setCurrentPage("paciente-detalle");
          }}
        />
      );
    }

    if (showDemandasInducidas && selectedPaciente && selectedFamilia) {
      return (
        <DemandasInducidasView
          paciente={selectedPaciente}
          familia={selectedFamilia}
          onBack={() => {
            setShowDemandasInducidas(false);
            setCurrentPage("paciente-detalle");
          }}
        />
      );
    }

    switch (currentPage) {
      case "inicio":
        return <InicioView currentRole={userRole} deviceType={deviceType} onNavigate={(page: string) => setCurrentPage(page)} />;
      case "crear-familia":
        return <CrearFamiliaView deviceType={deviceType} />;
      case "familias":
        return <FamiliasView deviceType={deviceType} />;
      case "familia-detalle":
        return selectedFamilia ? (
          <DetalleFamiliaView
            familia={selectedFamilia}
            onBack={() => setCurrentPage("familias")}
            onShowCaracterizacion={(familia: any, caracterizacion: any) => {
              setSelectedFamilia({ ...familia, caracterizacion });
              setCurrentPage("caracterizacion");
            }}
            onShowPaciente={(paciente: any, familia: any) => {
              setSelectedPaciente(paciente);
              setSelectedFamilia(familia);
              setCurrentPage("paciente-detalle");
            }}
          />
        ) : (
          <ResponsiveCard>Seleccione una familia desde la lista.</ResponsiveCard>
        );
      case "paciente-detalle":
        return selectedPaciente && selectedFamilia ? (
          <DetallePacienteView
            paciente={selectedPaciente}
            familia={selectedFamilia}
            caracterizacion={null} // Se cargará desde el contexto de la familia
            onBack={() => setCurrentPage("familia-detalle")}
          />
        ) : (
          <ResponsiveCard>Error: Datos del paciente no disponibles.</ResponsiveCard>
        );
            case "caracterizacion":
              return selectedFamilia ? (
                <FormularioCaracterizacionView
                  familia={selectedFamilia}
                  caracterizacionExistente={selectedFamilia.caracterizacion}
                  onSave={() => {
                    setCurrentPage("familia-detalle");
                  }}
                  onCancel={() => {
                    setCurrentPage("familia-detalle");
                  }}
                />
              ) : (
                <ResponsiveCard>Error: Familia no seleccionada.</ResponsiveCard>
              );
      case "consultas-asignadas":
      case "terapias-asignadas":
        return <ConsultasAsignadasView deviceType={deviceType} />;
      case "consultas-realizadas":
        return <ConsultasRealizadasView deviceType={deviceType} />;
      case "bitacora":
        return <BitacoraView deviceType={deviceType} />;
      case "bd-pacientes":
      case "bd-pacientes-agregada":
        return <BDPacientesView 
          deviceType={deviceType} 
          onSelectPaciente={(paciente: any, familia: any) => {
            setSelectedPaciente(paciente);
            setSelectedFamilia(familia);
            setCurrentPage("paciente-detalle");
          }}
        />;
      case "dashboard-epidemio":
        return <DashboardEpidemioView deviceType={deviceType} />;
      case "configuracion":
        return <ConfiguracionView deviceType={deviceType} />;
      case "ayuda":
        return <AyudaView deviceType={deviceType} />;
      default:
        return (
          <ResponsiveCard>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🚧</div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                En desarrollo
              </h3>
              <p className="text-stone-600 text-sm">
                Esta sección estará disponible próximamente
              </p>
            </div>
          </ResponsiveCard>
        );
    }
  };

  // Vista móvil
  if (deviceType === 'mobile') {
    return (
      <div className="min-h-screen bg-stone-50">
        {/* Header móvil */}
        <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setShowMobileMenu(true)}
              className="p-2 rounded-lg hover:bg-stone-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100">
                <RoleIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs text-stone-500">APS</div>
                <div className="text-sm font-semibold text-stone-900">{roleConfig.name}</div>
              </div>
            </div>
            
            <UserProfile user={{ name: user?.name || '', role: userRole }} onLogout={logout} />
          </div>
        </header>

        {/* Contenido principal */}
        <main className="px-4 py-4 pb-20">
          {renderPage()}
        </main>

        {/* Navegación inferior */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2">
          <div className="flex justify-around">
            {roleConfig.mainSections.slice(0, 4).map((section) => {
              const Icon = section.icon;
              const isActive = currentPage === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setCurrentPage(section.key)}
                  className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                    isActive ? "text-emerald-600 bg-emerald-50" : "text-stone-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{section.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Menú lateral móvil */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileMenu(false)}>
            <div className="w-80 h-full bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-stone-200">
                <h3 className="font-semibold text-stone-900">Menú</h3>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 rounded-lg hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Selector de rol */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Cambiar rol
                  </label>
                  <div className="p-3 bg-stone-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <RoleIcon className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-medium text-stone-700">{roleConfig.name}</span>
                    </div>
                    <div className="text-xs text-stone-500 mt-1">{user?.name}</div>
                  </div>
                </div>
                
                {/* Menú principal */}
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-2">Menú Principal</h4>
                  <div className="space-y-1">
                    <MobileNavItem
                      label="Inicio"
                      icon={Home}
                      active={currentPage === "inicio"}
                      onClick={() => {
                        setCurrentPage("inicio");
                        setShowMobileMenu(false);
                      }}
                    />
                    {roleConfig.mainSections.map((section) => (
                      <MobileNavItem
                        key={section.key}
                        label={section.label}
                        icon={section.icon}
                        active={currentPage === section.key}
                        onClick={() => {
                          setCurrentPage(section.key);
                          setShowMobileMenu(false);
                        }}
                        badge={section.key === "consultas-asignadas" ? "3" : undefined}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Herramientas */}
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-2">Herramientas</h4>
                  <div className="space-y-1">
                    {roleConfig.sidebarSections.map((section) => (
                      <MobileNavItem
                        key={section.key}
                        label={section.label}
                        icon={section.icon}
                        active={currentPage === section.key}
                        onClick={() => {
                          setCurrentPage(section.key);
                          setShowMobileMenu(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Cerrar sesión */}
                <div className="pt-4 border-t border-stone-200">
                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Vista desktop y tablet
  return (
    <div className="min-h-screen bg-sinbad-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-sinbad-200 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-san-marino to-bondi-blue flex items-center justify-center shadow-soft">
              <RoleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-eden-600">Programa APS</div>
              <div className="text-base font-semibold text-eden-800">Plataforma de Registro Clínico</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Selector de rol */}
            <div className="flex items-center gap-2 px-3 py-2 bg-san-marino-50 rounded-lg border border-san-marino-200">
              <RoleIcon className="w-4 h-4 text-san-marino-600" />
              <span className="text-sm font-medium text-san-marino-700">{roleConfig.name}</span>
            </div>
            <ResponsiveBadge tone="warning">Offline</ResponsiveBadge>
            <ResponsiveButton size="sm">Sincronizar</ResponsiveButton>
            <UserProfile user={{ name: user?.name || '', role: userRole }} onLogout={logout} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-2xl border border-sinbad-200 p-4 h-fit shadow-soft">
          <div className="space-y-1">
            <button
              onClick={() => setCurrentPage("inicio")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-left transition-all ${
                currentPage === "inicio" ? "bg-san-marino-50 text-san-marino-700 border border-san-marino-200 shadow-soft" : "text-eden-600 hover:bg-sinbad-50 hover:text-san-marino-700"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Inicio</span>
            </button>
            
            {/* Secciones principales */}
            <div className="pt-4">
              <h4 className="text-xs font-medium text-eden-500 uppercase tracking-wider mb-2 px-4">
                Menú Principal
              </h4>
              {roleConfig.mainSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.key}
                    onClick={() => setCurrentPage(section.key)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-left transition-all ${
                      currentPage === section.key ? "bg-san-marino-50 text-san-marino-700 border border-san-marino-200 shadow-soft" : "text-eden-600 hover:bg-sinbad-50 hover:text-san-marino-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                    {section.key === "consultas-asignadas" && (
                      <ResponsiveBadge tone="warning">3</ResponsiveBadge>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Herramientas */}
            <div className="pt-4">
              <h4 className="text-xs font-medium text-eden-500 uppercase tracking-wider mb-2 px-4">
                Herramientas
              </h4>
              {roleConfig.sidebarSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.key}
                    onClick={() => setCurrentPage(section.key)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-left transition-all ${
                      currentPage === section.key ? "bg-san-marino-50 text-san-marino-700 border border-san-marino-200 shadow-soft" : "text-eden-600 hover:bg-sinbad-50 hover:text-san-marino-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <section className="space-y-6">
          <ProtectedRoute requiredRole={userRole}>
            {renderPage()}
          </ProtectedRoute>
        </section>
      </main>
    </div>
  );
}