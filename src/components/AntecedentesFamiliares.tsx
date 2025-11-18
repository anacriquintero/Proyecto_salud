import React, { useState, useEffect } from 'react';

interface AntecedenteFamiliar {
  paciente_id: number;
  paciente_nombre: string;
  parentesco: string;
  familiar_nombre: string;
  condicion_salud: string;
  diagnostico: string;
  gravedad: string;
  estado_actual: string;
  fecha_diagnostico: string;
  fuente_antecedente: string;
}

interface AntecedentesFamiliaresProps {
  pacienteId: number;
}

export const AntecedentesFamiliares: React.FC<AntecedentesFamiliaresProps> = ({ pacienteId }) => {
  const [antecedentes, setAntecedentes] = useState<AntecedenteFamiliar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL base dinámica - usa localhost en desarrollo, la URL de producción en producción
  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001' 
    : 'https://salud-digital-backend.onrender.com';

  useEffect(() => {
    cargarAntecedentes();
  }, [pacienteId]);

  const cargarAntecedentes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/pacientes/${pacienteId}/antecedentes-familiares`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setAntecedentes(data.data);
      } else {
        setError(data.error || 'Error al cargar antecedentes familiares');
      }
    } catch (err) {
      console.error('Error cargando antecedentes:', err);
      setError(`Error de conexión: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  // Resto del código del componente permanece igual...
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-red-600 text-center">
          <p className="font-medium">Error al cargar antecedentes</p>
          <p className="text-sm mt-1">{error}</p>
          <button 
            onClick={cargarAntecedentes}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const antecedentesAutomaticos = antecedentes.filter(a => a.fuente_antecedente === 'Automático');
  const antecedentesManuales = antecedentes.filter(a => a.fuente_antecedente === 'Manual');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Antecedentes Familiares</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {antecedentes.length} antecedentes
          </span>
          {antecedentesAutomaticos.length > 0 && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {antecedentesAutomaticos.length} automáticos
            </span>
          )}
        </div>
      </div>

      {antecedentes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No se encontraron antecedentes familiares registrados.</p>
          <p className="text-sm mt-2">Los antecedentes automáticos aparecerán cuando se registren condiciones hereditarias en familiares.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Antecedentes Automáticos */}
          {antecedentesAutomaticos.length > 0 && (
            <div>
              <h4 className="font-medium text-green-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Antecedentes Automáticos
              </h4>
              <div className="space-y-3">
                {antecedentesAutomaticos.map((antecedente) => (
                  <div key={`${antecedente.familiar_nombre}-${antecedente.condicion_salud}`} 
                       className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">{antecedente.condicion_salud}</p>
                        <p className="text-sm text-gray-600">
                          {antecedente.parentesco}: {antecedente.familiar_nombre}
                        </p>
                        {antecedente.diagnostico && (
                          <p className="text-sm text-gray-500 mt-1">{antecedente.diagnostico}</p>
                        )}
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Automático
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      <span>Gravedad: {antecedente.gravedad}</span>
                      <span>Estado: {antecedente.estado_actual}</span>
                      {antecedente.fecha_diagnostico && (
                        <span>Diagnosticado: {new Date(antecedente.fecha_diagnostico).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Antecedentes Manuales */}
          {antecedentesManuales.length > 0 && (
            <div>
              <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Antecedentes Manuales
              </h4>
              <div className="space-y-3">
                {antecedentesManuales.map((antecedente) => (
                  <div key={`${antecedente.familiar_nombre}-${antecedente.condicion_salud}`} 
                       className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">{antecedente.condicion_salud}</p>
                        <p className="text-sm text-gray-600">
                          {antecedente.parentesco}: {antecedente.familiar_nombre}
                        </p>
                        {antecedente.diagnostico && (
                          <p className="text-sm text-gray-500 mt-1">{antecedente.diagnostico}</p>
                        )}
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Manual
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      <span>Gravedad: {antecedente.gravedad}</span>
                      <span>Estado: {antecedente.estado_actual}</span>
                      {antecedente.fecha_diagnostico && (
                        <span>Diagnosticado: {new Date(antecedente.fecha_diagnostico).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};