import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export interface IUserCounts {
  totalUsers: number;
  canHelpOutCount: number;
  canSeekHelpCount: number;
  profileCompletion: string;
}

export const useUserAction = () => {
  const [count, setCount] = useState<IUserCounts | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any>(null);

  const getUserCounts = async () => {
    try {
      setIsFetching(true);
      setError(null);

      const response = await api.get("/user/users-count");

      // API response shape: { success, message, data }
      setCount(response.data?.data ?? null);
    } catch (err) {
      console.log("getUserCounts error:", err);
      setError(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getUserCounts();
  }, []);

  return {
    count,
    isFetching,
    error,
    refetch: getUserCounts,
  };
};
