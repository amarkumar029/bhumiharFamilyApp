import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface IGetCounts {
  totalUsers: number;
  canHelpOutCount: number;
  canSeekHelpCount: number;
  profileCompletion: string;
}

export const useUsersCount = () => {
  const [data, setData] = useState<IGetCounts | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const getUserCounts = async () => {
    try {
      setIsFetching(true);

      const response = await api.get("/user/users-count");

      // API response → { success, message, data }
      setData(response.data?.data || null);
    } catch (err) {
      setError(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getUserCounts();
  }, []);

  return {
    count: data,
    isFetching,
    error,
    refetch: getUserCounts, // optional improvement
  };
};