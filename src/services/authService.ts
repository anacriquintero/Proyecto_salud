import { User, LoginCredentials } from '../types/auth';

// Tabla de credenciales de prueba
const TEST_CREDENTIALS = {
  'medico1': { password: 'Medico@123', role: 'medico', name: 'Dr. Juan Pérez' },
  'psicologo1': { password: 'Psico@123', role: 'psicologo', name: 'Psic. María García' },
  'fisio1': { password: 'Fisio@123', role: 'fisioterapeuta', name: 'Ft. Carlos López' },
  'nutri1': { password: 'Nutri@123', role: 'nutricionista', name: 'Nut. Ana Martínez' },
  'fono1': { password: 'Fono@123', role: 'fonoaudiologo', name: 'Fga. Laura Rodríguez' },
  'odonto1': { password: 'Odonto@123', role: 'odontologo', name: 'Od. Miguel Torres' },
  'enfermeroj1': { password: 'EnferJ@123', role: 'enfermero_jefe', name: 'Enf. Patricia Silva' },
  'auxiliar1': { password: 'Aux@123', role: 'auxiliar_enfermeria', name: 'Aux. Roberto Díaz' },
  'admin1': { password: 'Admin@123', role: 'administrativo', name: 'Adm. Sandra Morales' },
  'saludpublica1': { password: 'SaludP@123', role: 'ente_salud_publica', name: 'Dr. Fernando Castro' }
};

export class AuthService {
  private static readonly SESSION_KEY = 'aps_user_session';

  static async login(credentials: LoginCredentials): Promise<User> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userCredentials = TEST_CREDENTIALS[credentials.username as keyof typeof TEST_CREDENTIALS];
    
    if (!userCredentials || userCredentials.password !== credentials.password) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    const user: User = {
      id: credentials.username,
      username: credentials.username,
      role: userCredentials.role,
      name: userCredentials.name
    };

    // Guardar sesión en localStorage
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    
    return user;
  }

  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static getCurrentUser(): User | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;
      
      return JSON.parse(sessionData);
    } catch (error) {
      console.error('Error parsing session data:', error);
      this.logout();
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  static hasRole(requiredRole: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === requiredRole;
  }
}