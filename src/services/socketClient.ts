import { API_CONFIG } from "@/config";
import { io } from "socket.io-client";

export const getSocketClient = () => {
  const socket = io(API_CONFIG.baseUrl);
  socket.on("connect", () => {
    console.log("Conectado ao servidor Socket.IO");
  });
  socket.on("connect_error", (error) => {
    console.error("Erro de conexão:", error);
  });
  return socket;
};
