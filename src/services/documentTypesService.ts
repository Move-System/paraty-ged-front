import { getApiClient } from './apiClient';
const api = getApiClient();

export const getAllDocumentTypes = async () => {
  const response = await api.get('/document-types');
  return response.data;
};
