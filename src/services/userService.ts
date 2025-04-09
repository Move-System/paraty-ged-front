import { getApiClient } from "./apiClient";

const api = getApiClient();

export const getAllUser = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const getUserById = async (id: number) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
};