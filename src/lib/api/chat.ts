import axios from "axios";
import { API_BASE_URL } from "@/constants";
import {
  IActiveChat,
  IChatMessages,
  ICreatedMessage,
} from "@/types/chat";
import { ApiResponse } from "@/types";

// Create Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add Token (React Native does NOT have localStorage)
api.interceptors.request.use(async (config) => {
  // If you use AsyncStorage for token:
  // const token = await AsyncStorage.getItem("auth_token");
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const chatApi = {
  // ------------------ SEND MESSAGE ------------------
  async sendMessage({
    receiverId,
    content,
  }: {
    receiverId: string;
    content: string;
  }) {
    const response = await api.post<ApiResponse<ICreatedMessage>>(
      "/chats/messages",
      {
        receiverId,
        content,
      }
    );

    return response.data; // { success, message, data }
  },

  // ------------------ GET ACTIVE CHATS ------------------
  async getActiveChats() {
    const response = await api.get<ApiResponse<IActiveChat[]>>(
      "/chats"
    );

    return response.data;
  },

  // ------------------ GET CHAT MESSAGES ------------------
  async getChatMessages({
    chatId,
    pageParam,
  }: {
    chatId: string;
    pageParam: number;
  }) {
    const response = await api.get<
      ApiResponse<{ total: number; rows: IChatMessages[] }>
    >(`/chats/${chatId}/messages`, {
      params: { pageParam },
    });

    return {
      rows: response.data.data.rows,
      total: response.data.data.total,
    };
  },

  // ------------------ GET PARTICIPANT INFO ------------------
  async getParticipant({ chatId }: { chatId: string }) {
    const response = await api.get<
      ApiResponse<{ id: string; fullName: string; image: string | null }>
    >(`/chats/participant/${chatId}`);

    return response.data.data;
  },
};
