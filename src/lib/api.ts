import { api } from './axios';
import { LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/signup', credentials);
    return data;
  },

  requestOtp: async (phoneNumber: string): Promise<{ success: boolean }> => {
    const { data } = await api.post('/auth/request-otp', { phoneNumber });
    return data;
  },

  verifyOtp: async (phoneNumber: string, otp: string): Promise<{ verified: boolean }> => {
    const { data } = await api.post('/auth/verify-otp', { phoneNumber, otp });
    return data;
  },

  refreshToken: async (token: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/refresh-token', { token });
    return data;
  }
};