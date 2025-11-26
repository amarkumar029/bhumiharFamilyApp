import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

export const useGetProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | undefined>();

  const getProfileData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/user/me");
      setData(response.data.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
