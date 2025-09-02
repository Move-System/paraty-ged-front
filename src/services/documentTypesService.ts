import { getApiClient } from './apiClient';
const api = getApiClient();

import DocumentType from '@/types/documentType';

export const getAllDocumentTypes = async () => {
  const response = await api.get('/document-types');
  return response.data;
};

export const getDocumentTypeById = async (id: number) => {
  const response = await api.get(`/document-types/${id}`);
  return response.data;
};

export const createDocumentType = async (data: DocumentType) => {
  const response = await api.post('/document-types', data);
  return response.data;
};

export const updateDocumentType = async (id: number, data: DocumentType) => {
  const response = await api.put(`/document-types/${id}`, data);
  return response.data;
};

export const deleteDocumentType = async (id: number) => {
  const response = await api.delete(`/document-types/${id}`);
  return response.data;
};
