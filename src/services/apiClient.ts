import { API_CONFIG } from "@/config";
import axios, { AxiosInstance } from "axios";

let client: AxiosInstance | null = null;

export const getApiClient = () => {
  if (client) return client;
  client = axios.create({
    baseURL: API_CONFIG.baseUrl,
  });

  client.interceptors.request.use((config) => {
    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  })
  return client;
};
