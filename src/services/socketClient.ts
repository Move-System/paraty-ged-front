import { API_CONFIG } from "@/config";
import { io } from "socket.io-client";

export const getSocketClient = () => {
  return io(API_CONFIG.baseUrl);
};
