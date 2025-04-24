import { getApiClient } from './apiClient';
const api = getApiClient();

export const getDashboardSummary = async () => {
  const response = await api.get('/dashboard-summary');
  return response.data;
};
