import { getApiClient } from "./apiClient";
import { CreateUserDTO } from "./types";
const api = getApiClient();



export const getAllUser = async () => {
    const response = await api.get("/users");
    console.log(response.data);
    return response.data;
};

export const getUserById = async (id: number) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
};

export const createUser = async (data: CreateUserDTO) => {
    const response = await api.post("/user", data);
    return response.data;
};

export const inactivateUser = async (id: number) => {
    const response = await api.put(`/users/inactive/${id}`);
    return response.data;
};

export const updateUser = async (id: number, data: CreateUserDTO) => {
    const response = await api.put(`/user/${id}`, data);
    return response.data;
};