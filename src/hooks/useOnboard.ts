import { api } from "../lib/axios";
import { setUser, setError, setLoading } from "../store/slices/authSlice";
import { FormData } from "../types/form";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useOnboard = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onBoardUser = async (data: FormData) => {
    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const payload = {
        ...data,
        location: data.location ?? { state: "", city: "", mohalla: "" },
      };

      const response = await api.put("/user/onboard", payload);

      const userData = response.data?.data;

      if (!userData || !userData.user) {
        console.error("Invalid API response structure:", response.data);
        throw new Error("Failed to onboard: server returned invalid user data");
      }

      dispatch(setUser({ user: userData.user }));
    } catch (error: any) {
      console.error("ONBOARD ERROR:", error?.response?.data || error.message || error);
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Onboarding failed. Please try again.";
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
      setIsLoading(false);
    }
  };

  // ✅ MUST RETURN THESE!
  return {
    onBoardUser,
    isLoading,
  };
};