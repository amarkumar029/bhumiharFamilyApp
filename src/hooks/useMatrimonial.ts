import { api } from "../lib/axios";
import { ApiResponse } from "../types";
import { useCallback, useState } from "react";

interface UserFilters {
  ageRange?: [number, number];
  religion?: string;
  caste?: string;
  maritalStatus?: string;
  location?: string;
  education?: string;
  occupation?: string;
}

interface PartnerPreferences {
  ageRange?: [number, number];
  heightRange?: [number, number];
  education?: string;
  income?: [number, number];
  location?: string;
  occupation?: string;
  religion?: string;
  caste?: string;
  maritalStatus?: string;
}

export const useMatrimonial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const searchProfiles = useCallback(async (filters: UserFilters, page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await api.get('/profiles/search', {
        params: { ...filters, page, limit }
      });
      const data = response.data.data;
      setHasMore(data.currentPage < data.totalPages);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error searching profiles');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecommendedProfiles = useCallback(async (page = 1, limit = 5) => {
    setLoading(true);
    try {
      const response = await api.get<ApiResponse<any>>('/matrimonial/profiles/recommended', {
        params: { page, limit }
      });

      const data = response.data.data;
      setHasMore(+data.currentPage < data.totalPages);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error getting recommended profiles');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProfileDetails = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/profile/${userId}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error getting profile details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePartnerPreferences = useCallback(async (preferences: PartnerPreferences) => {
    setLoading(true);
    try {
      const response = await api.put('/preferences', preferences);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error updating preferences');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchProfiles,
    getRecommendedProfiles,
    getProfileDetails,
    updatePartnerPreferences,
    loading,
    error,
    hasMore,
  };
};