const fetch = require('node-fetch');

const BASE_URL = process.env.FHIR_BASE_URL || 'http://localhost:8080/hapi-fhir-jpaserver/fhir';
const USERNAME = process.env.FHIR_USERNAME;
const PASSWORD = process.env.FHIR_PASSWORD;

function getAuthHeaders() {
  if (USERNAME && PASSWORD) {
    const token = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
    return { Authorization: `Basic ${token}` };
  }
  return {};
}

async function fhirRequest(method, resourceType, body, resourceId, queryString) {
  const urlParts = [BASE_URL, resourceType];
  if (resourceId) {
    urlParts.push(resourceId);
  }
  let url = urlParts.join('/');
  if (queryString) {
    url += `?${queryString}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
      ...getAuthHeaders()
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`FHIR ${method} ${resourceType} failed: ${response.status} ${text}`);
  }

  return response.json();
}

async function upsertPatient(patientResource, identifierValue) {
  if (!patientResource || patientResource.resourceType !== 'Patient') {
    throw new Error('Invalid Patient resource');
  }

  if (identifierValue) {
    const sanitizedId = identifierValue.replace(/[^A-Za-z0-9\-]/g, '');
    return fhirRequest('PUT', 'Patient', { ...patientResource, id: sanitizedId }, sanitizedId);
  }

  return fhirRequest('POST', 'Patient', patientResource);
}

async function createCondition(conditionResource) {
  if (!conditionResource || conditionResource.resourceType !== 'Condition') {
    throw new Error('Invalid Condition resource');
  }
  return fhirRequest('POST', 'Condition', conditionResource);
}

async function createMedication(medicationResource, medicationId) {
  if (!medicationResource || medicationResource.resourceType !== 'Medication') {
    throw new Error('Invalid Medication resource');
  }
  if (medicationId) {
    return fhirRequest('PUT', 'Medication', { ...medicationResource, id: medicationId }, medicationId);
  }
  return fhirRequest('POST', 'Medication', medicationResource);
}

async function createMedicationRequest(medicationRequestResource) {
  if (!medicationRequestResource || medicationRequestResource.resourceType !== 'MedicationRequest') {
    throw new Error('Invalid MedicationRequest resource');
  }
  return fhirRequest('POST', 'MedicationRequest', medicationRequestResource);
}

module.exports = {
  upsertPatient,
  createCondition,
  createMedication,
  createMedicationRequest,
  helpers: {
    BASE_URL
  }
};

