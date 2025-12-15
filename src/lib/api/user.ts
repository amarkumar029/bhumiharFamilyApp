import { ApiResponse, User } from "../../types";
import { api } from "../axios"; // same axios instance
import {
  BasicUserProfile,
  CommunityDetails,
  MatrimonialDetails,
  UserProfile,
} from "../../types/profile";

interface IGetCounts {
  totalUsers: number;
  canHelpOutCount: number;
  canSeekHelpCount: number;
  profileCompletion: string;
}

export const userApi = {
  // ✔ Get dashboard user counts
  async getUsersCount() {
    const response = await api.get<ApiResponse<IGetCounts>>("/user/users-count");
    return response.data.data;
  },

  // ✔ Get public profile by user ID
  async getUsersProfileData(userId: string) {
    const result = await api.get(`/user/profile/${userId}`);
    return result.data.data;
  },

  // ✔ Filter all users (supports pagination + search)
  async getAllUsers(keyword: string, pageParam: number) {
    const response = await api.get<
      ApiResponse<{ rows: User[]; total: number }>
    >(`/user/filter`, {
      params: {
        keyword,
        pageParam,
        limit: 8,
      },
    });

    return {
      rows: response.data.data.rows,
      total: response.data.data.total,
    };
  },

  // ✔ Get my profile
  async getMyProfile() {
    const response = await api.get<ApiResponse<UserProfile>>("/user/me");
    return response.data.data;
  },

  // ✔ Update personal info
  async updatePersonalDetails(data: BasicUserProfile) {
    const result = await api.put<ApiResponse<BasicUserProfile>>(
      "/user/personal-details",
      data
    );

    return result.data.data;
  },

  // ✔ Update community details
  async updateCommunityDetails(data: CommunityDetails) {
    const result = await api.put<ApiResponse<CommunityDetails>>(
      "/user/community-details",
      data
    );

    return result.data.data;
  },

  // ✔ Update matrimonial information
  async updateMatrimonialDetails(data: MatrimonialDetails) {
    const result = await api.put<ApiResponse<MatrimonialDetails>>(
      "/user/matrimonial-details",
      data
    );

    return result.data.data;
  },
};