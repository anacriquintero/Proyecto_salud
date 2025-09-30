// src/services/authService.ts
import { User, LoginCredentials } from '../types/auth';

const API_URL = 'http://localhost:3001/api';

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: string;
  roleId: number;
  team: string;
  document: string;
}

export interface LoginResponse {
  success: boolean;
  user: ApiUser;
}

export class AuthService {
  private static readonly SESSION_KEY = 'aps_user_session';

  static async login(credentials: LoginCredentials): Promise<User> {
    try {
      console.log('Intentando login con:', credentials);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: credentials.username, 
          password: credentials.password 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error de autenticación');
      }

      const result: LoginResponse = await response.json();
      
      if (!result.success || !result.user) {
        throw new Error('Error en la respuesta del servidor');
      }

      // Mapear el usuario de la API al formato que espera tu frontend
      const user: User = {
        id: result.user.id.toString(),
        username: result.user.email,
        role: this.mapRole(result.user.role),
        name: result.user.name,
        // Datos adicionales que puedes usar
        email: result.user.email,
        team: result.user.team,
        document: result.user.document
      };

      console.log('Login exitoso:', user);
      
      // Guardar sesión en localStorage
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error(error instanceof Error ? error.message : 'Error de conexión con el servidor');
    }
  }

  // Mapear roles de la base de datos a los roles de tu frontend
  private static mapRole(dbRole: string): string {
    const roleMap: { [key: string]: string } = {
      'Médico': 'medico',
      'Psicólogo': 'psicologo',
      'Fisioterapeuta': 'fisioterapeuta',
      'Nutricionista': 'nutricionista',
      'Fonoaudiólogo': 'fonoaudiologo',
      'Odontólogo': 'odontologo',
      'Enfermero Jefe': 'enfermero_jefe',
      'Auxiliar de enfermería': 'auxiliar_enfermeria',
      'Administrativo': 'administrativo',
      'Ente de Salud Pública': 'ente_salud_publica',
      'Administrador': 'administrador'
    };
    
    return roleMap[dbRole] || dbRole.toLowerCase();
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

  // Nuevos métodos para obtener datos de la base de datos
  static async getFamilias() {
    try {
      const response = await fetch(`${API_URL}/familias`);
      if (!response.ok) throw new Error('Error obteniendo familias');
      return response.json();
    } catch (error) {
      console.error('Error fetching familias:', error);
      throw error;
    }
  }

  static async getUsuariosPorRol(rol: string) {
    try {
      const response = await fetch(`${API_URL}/usuarios/rol/${rol}`);
      if (!response.ok) throw new Error('Error obteniendo usuarios');
      return response.json();
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      throw error;
    }
  }

  // Health check del servidor
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Servidor no disponible:', error);
      return false;
    }
  }
}