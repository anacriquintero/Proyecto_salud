import React, { useState } from 'react';
import { Search, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { AuthService } from '../services/authService';
import { DatosADRES } from '../types/adres';

interface ConsultarADRESButtonProps {
  numeroDocumento: string;
  tipoDocumento?: string;
  onDatosEncontrados: (datos: DatosADRES | null) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Componente botón para consultar datos de paciente desde ADRES
 * Muestra estados de carga, éxito y error
 */
export const ConsultarADRESButton: React.FC<ConsultarADRESButtonProps> = ({
  numeroDocumento,
  tipoDocumento = 'CC',
  onDatosEncontrados,
  disabled = false,
  className = ''
}) => {
  const [consultando, setConsultando] = useState(false);
  const [estado, setEstado] = useState<'idle' | 'success' | 'error' | 'not_found'>('idle');

  const handleConsultar = async () => {
    if (!numeroDocumento || numeroDocumento.trim().length < 5) {
      alert('Por favor ingresa un número de documento válido (mínimo 5 caracteres)');
      return;
    }

    try {
      setConsultando(true);
      setEstado('idle');

      const respuesta = await AuthService.consultarADRES(numeroDocumento.trim(), tipoDocumento);

      if (respuesta.success && respuesta.datos) {
        setEstado('success');
        onDatosEncontrados(respuesta.datos);
        // Resetear estado después de 2 segundos
        setTimeout(() => setEstado('idle'), 2000);
      } else {
        setEstado('not_found');
        onDatosEncontrados(null);
        alert(respuesta.message || 'No se encontró información del paciente en ADRES. Puede ingresar los datos manualmente.');
        setTimeout(() => setEstado('idle'), 3000);
      }
    } catch (error: any) {
      console.error('Error consultando ADRES:', error);
      setEstado('error');
      alert(`Error consultando ADRES: ${error.message || 'Error desconocido'}`);
      setTimeout(() => setEstado('idle'), 3000);
    } finally {
      setConsultando(false);
    }
  };

  const isDisabled = disabled || consultando || !numeroDocumento || numeroDocumento.trim().length < 5;

  const getButtonContent = () => {
    if (consultando) {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Consultando...</span>
        </>
      );
    }

    if (estado === 'success') {
      return (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>Encontrado</span>
        </>
      );
    }

    if (estado === 'error' || estado === 'not_found') {
      return (
        <>
          <XCircle className="w-4 h-4" />
          <span>No encontrado</span>
        </>
      );
    }

    return (
      <>
        <Search className="w-4 h-4" />
        <span>Consultar ADRES</span>
      </>
    );
  };

  const getButtonStyle = () => {
    if (estado === 'success') {
      return 'bg-green-100 text-green-700 hover:bg-green-200 border-green-300';
    }
    if (estado === 'error' || estado === 'not_found') {
      return 'bg-red-100 text-red-700 hover:bg-red-200 border-red-300';
    }
    return 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-300';
  };

  return (
    <button
      type="button"
      onClick={handleConsultar}
      disabled={isDisabled}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 
        rounded-lg text-sm font-medium
        transition-colors border
        ${getButtonStyle()}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      title={isDisabled ? 'Ingresa un número de documento válido' : 'Consultar datos del paciente desde ADRES'}
    >
      {getButtonContent()}
    </button>
  );
};

export default ConsultarADRESButton;

