import { API_CONFIG } from "@/config";
import axios, { AxiosInstance } from "axios";

let client: AxiosInstance | null = null;

export const getApiClient = () => {
  if (client) return client;
  client = axios.create({
    baseURL: API_CONFIG.baseUrl,
  });
  return client;
};
