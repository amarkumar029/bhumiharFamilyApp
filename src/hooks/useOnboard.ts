import { api } from "@/lib/axios";
import { setUser, setError, setLoading } from "@/store/slices/authSlice";
import { FormData } from "@/types/form";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useOnboard = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onBoardUser = async (data: FormData) => {
    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const response: any = await api.put("/user/onboard", data);

      const userData = response.data.data;

      // Set user in Redux
      dispatch(setUser({ user: userData.user }));

    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || "Onboarding Failed"));
    } finally {
      dispatch(setLoading(false));
      setIsLoading(false);
    }
  };

  return {
    onBoardUser,
    isLoading,
  };
};
