import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

export const useGetUsers = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[] | null>(null);
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>("");

  // Debounce the keyword to prevent rapid API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  const getUser = async () => {
    try {
      setIsFetching(true);
      setError(null);

      const response = await api.get(`/user/filter?keyword=${debouncedKeyword}`);

      // Adjust based on your backend shape
      setData(response.data.data.rows);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Error fetching users");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (debouncedKeyword.trim() !== "") {
      getUser();
    } else {
      setData(null);
    }
  }, [debouncedKeyword]);

  return {
    isFetching,
    setKeyword,
    error,
    data,
  };
};
