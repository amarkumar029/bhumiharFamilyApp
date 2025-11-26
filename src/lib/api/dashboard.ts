import { ApiResponse } from "@/types";
import { api } from "../axios"; 
import { IRandomPost, IRecentChat } from "@/types/post";

const dashboardApi = {
  getRandomPosts: async (): Promise<IRandomPost[]> => {
    const response = await api.get<ApiResponse<IRandomPost[]>>("/dashboard/posts");
    return response.data.data;
  },

  getRecentChats: async (): Promise<IRecentChat[]> => {
    const response = await api.get<ApiResponse<IRecentChat[]>>("/dashboard/recent-chats");
    return response.data.data;
  },

  getProfileCompletion: async (): Promise<{
    profileCompletion: number;
    inCompleteFields: string[];
  }> => {
    const response = await api.get<
      ApiResponse<{ profileCompletion: number; inCompleteFields: string[] }>
    >("/dashboard/profile-completion");

    return response.data.data;
  },
};

export default dashboardApi;