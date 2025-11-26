import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "@/store";
import { setCredentials, setError, logout } from "@/store/slices/authSlice";
import { api } from "@/lib/axios";
import { LoginCredentials, SignupCredentials } from "@/types/auth";
import Toast from "react-native-toast-message";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials);

      await AsyncStorage.setItem("ACCESS_TOKEN", data.data.accessToken);
      await AsyncStorage.setItem("REFRESH_TOKEN", data.data.refreshToken);

      dispatch(setCredentials(data.data));

      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Login error:", error);

      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.response?.data?.message || "Invalid credentials",
      });

      dispatch(setError(error.response?.data?.message || "Login failed"));
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    try {
      const { data } = await api.post("/auth/signup", credentials);

      await AsyncStorage.setItem("ACCESS_TOKEN", data.data.accessToken);
      await AsyncStorage.setItem("REFRESH_TOKEN", data.data.refreshToken);

      dispatch(setCredentials(data.data));

      navigation.navigate("Onboarding");
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || "Signup failed"));
    }
  };

  const requestOtp = async (phoneNumber: string) => {
    try {
      await api.post("/auth/request-otp", { phoneNumber });
      return true;
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || "OTP request failed"));
      return false;
    }
  };

  const verifyOtp = async (phoneNumber: string, otp: string) => {
    try {
      const { data } = await api.post("/auth/verify-otp", { phoneNumber, otp });
      return data.verified;
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "OTP verification failed")
      );
      return false;
    }
  };

  const logoutUser = async () => {
    dispatch(logout());
    await AsyncStorage.removeItem("ACCESS_TOKEN");
    await AsyncStorage.removeItem("REFRESH_TOKEN");

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return {
    ...auth,
    login,
    signup,
    logout: logoutUser,
    requestOtp,
    verifyOtp,
  };
};
