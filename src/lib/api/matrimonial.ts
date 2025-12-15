import { ApiResponse } from "../../types";
import { api } from "../axios"; // your axios instance
import {
  MatrimonialProfile,
  PartnerPreferences,
  SearchFilters,
} from "../../types/matrimonial";

const matrimonialApi = {
  // Get Recommended Profiles
  getRecommendedProfiles: async ({
    page = 1,
    limit = 5,
  }: {
    page?: number;
    limit?: number;
  }) => {
    const result = await api.get<
      ApiResponse<{ total: number; profiles: MatrimonialProfile[] }>
    >("/matrimonial/profiles/recommended", {
      params: { page, limit },
    });

    return {
      total: result.data.data.total,
      profiles: result.data.data.profiles,
    };
  },

  // Get Profile Details
  getProfileDetails: async (userId: string) => {
    const result = await api.get<ApiResponse<MatrimonialProfile>>(
      `/matrimonial/profile/${userId}`
    );
    return result.data.data;
  },

  // Update Partner Preferences
  updatePartnerPreferences: async (preferences: PartnerPreferences) => {
    const result = await api.put<ApiResponse<MatrimonialProfile>>(
      "/matrimonial/preferences",
      preferences
    );
    return result.data.data;
  },

  // Send Interest
  sendInterest: async ({
    receiverId,
    message,
  }: {
    receiverId: string;
    message?: string;
  }) => {
    const result = await api.post<ApiResponse<any>>(
      "/matrimonial/interests/send",
      { receiverId, message }
    );
    return result.data;
  },

  // Get Received Interests
  getReceivedInterests: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/matrimonial/interests/received`, {
        params: { page, limit },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching received interests:", error);
      throw error;
    }
  },

  // Search Profiles
  searchProfiles: async (filters: SearchFilters) => {
    try {
      // clean empty filters
      const cleanFilters = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      const response = await api.get("/matrimonial/profiles/search", {
        params: cleanFilters,
        paramsSerializer: {
          encode: (param: string) => param,
        },
      });

      return {
        total: response.data.data.total,
        profiles: response.data.data.profiles,
      };
    } catch (error) {
      console.error("Error searching profiles:", error);
      throw error;
    }
  },

  // Get Sent Interests
  getSentInterests: async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) => {
    const result = await api.get<ApiResponse<any>>(
      "/matrimonial/interests/sent",
      {
        params: { page, limit },
      }
    );

    return result.data.data;
  },

  // Respond to Interest
  respondToInterest: async ({
    interestId,
    status,
  }: {
    interestId: string;
    status: "ACCEPTED" | "DECLINED";
  }) => {
    const result = await api.put<ApiResponse<any>>(
      `/matrimonial/interests/${interestId}/respond`,
      { status }
    );
    return result.data;
  },

  // Withdraw Interest
  withdrawInterest: async (interestId: string) => {
    const result = await api.delete<ApiResponse<any>>(
      `/matrimonial/interests/${interestId}`
    );
    return result.data.data;
  },

  // Block User
  blockUser: async ({
    blockedId,
    reason,
  }: {
    blockedId: string;
    reason?: string;
  }) => {
    const result = await api.post<ApiResponse<any>>("/matrimonial/blocks", {
      blockedId,
      reason,
    });

    return result.data.data;
  },

  // Unblock User
  unblockUser: async (blockedId: string) => {
    const result = await api.delete<ApiResponse<any>>(
      `/matrimonial/blocks/${blockedId}`
    );

    return result.data.data;
  },

  // Get Blocked Users
  getBlockedUsers: async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) => {
    const result = await api.get<ApiResponse<any>>("/matrimonial/blocks", {
      params: { page, limit },
    });

    return result.data.data;
  },

  // Report User
  reportUser: async ({
    reportedId,
    reason,
    description,
  }: {
    reportedId: string;
    reason: string;
    description?: string;
  }) => {
    const result = await api.post<ApiResponse<any>>("/matrimonial/reports", {
      reportedId,
      reason,
      description,
    });

    return result.data.data;
  },
};

export default matrimonialApi;
