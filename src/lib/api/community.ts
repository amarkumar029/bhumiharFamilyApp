import { api } from "../axios"; // ✅ RN-friendly relative path
import { ApiResponse, IUsers } from "../../types";

/* ===================== */
/* TYPES */
/* ===================== */

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ICheckOutList {
  id: string;
  fullName: string;
  image: string | null;
  currentLocation: string | null;
  bioData: string | null;
  educationDegree: string | null;
  specializedDegree: string | null;
}

export interface INotInterestedUser extends ICheckOutList {
  type: "helpers" | "seekers";
  _id: string;
}

export interface UsersResponse {
  user: IUsers[];
  pagination: Pagination;
}

export interface LocationFilter {
  states: string[];
  cities: string[];
  locations: string[];
}

export interface Keywords {
  canHelpOut: string[];
  canSeekHelp: string[];
}

export interface CommunityUsersParams {
  type: "helpers" | "seekers";
  keywords: string[];
  page?: number;
  limit?: number;
  locationFilter?: LocationFilter;
  profession?: string | null;
  excludeUsers?: string[];
}

/* ===================== */
/* API METHODS */
/* ===================== */

const communityApi = {
  /* -------- USERS LIST -------- */
  getUsers: async ({
    type,
    keywords,
    page = 1,
    limit = 6,
    locationFilter,
    profession,
    excludeUsers = [],
  }: CommunityUsersParams): Promise<UsersResponse> => {
    const params: Record<string, any> = {
      keywords: keywords.join(","),
      page,
      limit,
    };

    if (
      locationFilter &&
      (locationFilter.states.length ||
        locationFilter.cities.length ||
        locationFilter.locations.length)
    ) {
      params.locationFilter = JSON.stringify(locationFilter);
    }

    if (profession) {
      params.profession = profession;
    }

    if (excludeUsers.length > 0) {
      params.excludeUsers = JSON.stringify(excludeUsers);
    }

    const response = await api.get<ApiResponse<UsersResponse>>(
      `/community/${type}`,
      { params }
    );

    return response.data.data;
  },

  /* -------- FILTERS -------- */
  getFilters: async (): Promise<Keywords> => {
    const response = await api.get<
      ApiResponse<{
        canSeekHelp: string[];
        canHelpOut: string[];
      }>
    >("/user/filters");

    return response.data.data;
  },

  /* -------- CHECKOUT LIST -------- */
  addToCheckoutList: async (targetUserId: string): Promise<boolean> => {
    const response = await api.post<ApiResponse<{ success: boolean }>>(
      "/community/checkout-list",
      { targetUserId }
    );

    return response.data.success;
  },

  removeFromCheckoutList: async (userId: string): Promise<boolean> => {
    const response = await api.delete<ApiResponse<{ success: boolean }>>(
      `/community/checkout-list/${userId}`
    );

    return response.data.success;
  },

  getCheckoutList: async (): Promise<IUsers[]> => {
    const response = await api.get<ApiResponse<{ users: IUsers[] }>>(
      "/community/checkout-list"
    );

    return response.data.data.users;
  },

  /* -------- NOT INTERESTED -------- */
  markAsNotInterested: async (targetUserId: string): Promise<boolean> => {
    const response = await api.post<ApiResponse<{ success: boolean }>>(
      "/community/not-interested",
      { targetUserId }
    );

    return response.data.success;
  },

  getNotInterestedUsers: async (): Promise<{
    users: INotInterestedUser[];
  }> => {
    const response = await api.get<
      ApiResponse<{ users: INotInterestedUser[] }>
    >("/community/not-interested-users");

    return response.data.data;
  },

  removeNotInterestedUser: async (interestId: string): Promise<boolean> => {
    const response = await api.delete<ApiResponse<{ success: boolean }>>(
      `/community/remove-not-interested/${interestId}`
    );

    return response.data.success;
  },
};

export default communityApi;