import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../axios";
import {
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
} from "../../types/auth";
import { LOCAL_STORAGE_KEYS } from "../../constants";

export const authApi = {
  // LOGIN
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  },

  // SIGNUP
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/signup", credentials);
    return data;
  },

  // SEND OTP
  sentOtp: async (
    phoneNumber: string
  ): Promise<{ success: boolean; data: string }> => {
    const { data } = await api.post("/auth/request-otp", { phoneNumber });
    console.log("OTP Response:", data);
    return data;
  },

  // VERIFY OTP
  verifyOtp: async (
    phoneNumber: string,
    otp: string
  ): Promise<{ success: boolean }> => {
    // AsyncStorage instead of localStorage
    const secret = await AsyncStorage.getItem(
      LOCAL_STORAGE_KEYS.REGISTER_SECRET_KEY
    );

    const { data } = await api.post("/auth/verify-otp", {
      secret,
      phoneNumber,
      otp,
    });

    return data;
  },

  // REFRESH TOKEN
  refreshToken: async (token: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/refresh-token", {
      token,
    });
    return data;
  },
};
