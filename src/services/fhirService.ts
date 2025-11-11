const API_URL = 'http://localhost:3001/api';

interface FhirResponse<T = any> {
  success: boolean;
  resource: T;
}

async function post<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`FHIR gateway error: ${response.status} ${text}`);
  }

  return response.json();
}

export async function syncPatient(resource: any, identifier?: string): Promise<FhirResponse> {
  return post<FhirResponse>('/fhir/patient', { resource, identifier });
}

export async function createCondition(resource: any): Promise<FhirResponse> {
  return post<FhirResponse>('/fhir/condition', { resource });
}

export async function createMedication(resource: any, id?: string): Promise<FhirResponse> {
  return post<FhirResponse>('/fhir/medication', { resource, id });
}

export async function createMedicationRequest(resource: any): Promise<FhirResponse> {
  return post<FhirResponse>('/fhir/medication-request', { resource });
}

