import { getApiClient } from './apiClient';
import { CreateUserDTO, UserPaginationResponse } from './types';
const api = getApiClient();

export const getAllUser = async (
  search = '',
  page = 1,
  limit = 10,
): Promise<UserPaginationResponse> => {
  const response = await api.get('/users', {
    params: {
      search,
      page,
      limit,
    },
  });
  console.log(response.data);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const createUser = async (data: CreateUserDTO) => {
  const response = await api.post('/user', data);
  return response.data;
};

export const inactivateUser = async (id: number) => {
  const response = await api.put(`/users/inactive/${id}`);
  return response.data;
};

export const updateUser = async (id: number, data: CreateUserDTO) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};
