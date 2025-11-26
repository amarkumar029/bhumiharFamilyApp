import { api } from "@/lib/axios"; // Your RN axios instance
import { ApiResponse, IUsers } from "@/types";

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

export interface isNotInterestedUser extends ICheckOutList {
  type: string;
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

const communityApi = {
  // ✅ Fetch Users with Filters
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
      (locationFilter.states.length > 0 ||
        locationFilter.cities.length > 0 ||
        locationFilter.locations.length > 0)
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

  // ✅ Filters: Seek Help / Help Out
  getFilters: async (): Promise<Keywords> => {
    const response = await api.get<
      ApiResponse<{
        canSeekHelp: string[];
        canHelpOut: string[];
      }>
    >("/user/filters");

    return response.data.data;
  },

  // ✅ Add to Checkout List
  addToCheckoutList: async (targetUserId: string): Promise<boolean> => {
    const response = await api.post<ApiResponse<{ success: boolean }>>(
      "/community/checkout-list",
      { targetUserId }
    );

    return response.data.data.success;
  },

  // ✅ Remove from Checkout List
  removeFromCheckoutList: async (userId: string): Promise<boolean> => {
    const response = await api.delete<ApiResponse<{ success: boolean }>>(
      `/community/checkout-list/${userId}`
    );

    return response.data.data.success;
  },

  // ✅ Mark as Not Interested
  markAsNotInterested: async (targetUserId: string): Promise<boolean> => {
    const response = await api.post<ApiResponse<{ success: boolean }>>(
      "/community/not-interested",
      { targetUserId }
    );

    return response.data.data.success;
  },

  // ✅ Fetch Checkout List
  getCheckoutList: async (): Promise<IUsers[]> => {
    const response = await api.get<ApiResponse<{ users: IUsers[] }>>(
      "/community/checkout-list"
    );

    return response.data.data.users;
  },

  // ✅ Fetch Not Interested Users
  getNotInterestedUsers: async () => {
    const response = await api.get<
      ApiResponse<{ users: isNotInterestedUser[] }>
    >("/community/not-interested-users");

    return response.data.data.users;
  },

  // ✅ Remove Not Interested User
  removeNotInterestedUser: async (interestId: string) => {
    const response = await api.delete<ApiResponse<{ success: boolean }>>(
      `/community/remove-not-interested/${interestId}`
    );

    return response.data.data;
  },
};

export default communityApi;
