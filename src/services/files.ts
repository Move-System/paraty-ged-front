import { getApiClient } from './apiClient';

const api = getApiClient();

export const getAllFiles = async (params: {
  page?: number;
  limit?: number;
  type?: string;
  date?: string;
}) => {
  const res = await api.get('/files', { params });
  return res.data;
};

export const getFileById = async (id: number) => {
  const res = await api.get(`/files/${id}`);
  return res.data;
};

export const updateFile = async (
  id: number,
  title: string,
  visible: string,
  documentTypeId?: number,
) => {
  const res = await api.put(`/files/${id}`, { title, visible, documentTypeId });
  return res.data;
};
