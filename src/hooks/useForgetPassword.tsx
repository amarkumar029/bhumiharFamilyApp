import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/lib/axios";
import { toast } from "@/hooks/toast"; // RN toast
import { LOCAL_STORAGE_KEYS } from "@/constants";

export type ForgetPasswordStep = "phone" | "otp" | "reset";

interface ForgetPasswordState {
  phoneNumber: string;
  otp: string;
  password: string;
  confirmPassword: string;
  step: ForgetPasswordStep;
  isLoading: boolean;
  error: string | null;
}

export function useForgetPassword() {
  const [state, setState] = useState<ForgetPasswordState>({
    phoneNumber: "",
    otp: "",
    password: "",
    confirmPassword: "",
    step: "phone",
    isLoading: false,
    error: null,
  });

  const updateState = (newState: Partial<ForgetPasswordState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const setStep = (step: ForgetPasswordStep) => updateState({ step });
  const resetError = () => updateState({ error: null });

  const sendOTP = async () => {
    try {
      resetError();
      updateState({ isLoading: true });

      const response = await api.post("/auth/request-reset-password", {
        phoneNumber: state.phoneNumber,
      });

      if (!(response as any).data.success) {
        throw new Error(response.data.message || "Failed to send OTP");
      }

      await AsyncStorage.setItem(
        LOCAL_STORAGE_KEYS.FORGET_PASS_SECRET_KEY,
        (response as any).data.data
      );

      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your WhatsApp",
        type: "success",
      });

      setStep("otp");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error.message || "Failed to send OTP";
      updateState({ error: errorMessage });

      toast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      updateState({ isLoading: false });
    }
  };

  const verifyOTP = async () => {
    try {
      resetError();
      updateState({ isLoading: true });

      const secret = await AsyncStorage.getItem(
        LOCAL_STORAGE_KEYS.FORGET_PASS_SECRET_KEY
      );

      const response = await api.post("/auth/verify-reset-request", {
        phoneNumber: state.phoneNumber,
        otp: state.otp,
        secret,
      });

      if (!(response as any).data.success) {
        throw new Error(response.data.message || "Invalid OTP");
      }

      toast({
        title: "OTP Verified",
        description: "Your OTP has been verified successfully",
        type: "success",
      });

      setStep("reset");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to verify OTP";
      updateState({ error: errorMessage });

      toast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      updateState({ isLoading: false });
    }
  };

  const resetPassword = async () => {
    try {
      resetError();

      if (state.password !== state.confirmPassword) {
        const msg = "Passwords do not match";
        updateState({ error: msg });
        toast({ title: "Error", description: msg, type: "error" });
        return false;
      }

      updateState({ isLoading: true });

      const response = await api.post("/auth/reset-password", {
        phoneNumber: state.phoneNumber,
        password: state.password,
        otp: state.otp,
      });

      if (!(response as any).data.success) {
        throw new Error(response.data.message || "Failed to reset password");
      }

      toast({
        title: "Success",
        description: "Your password has been reset successfully",
        type: "success",
      });

      return true;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error.message || "Failed to reset password";
      updateState({ error: errorMessage });

      toast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });

      return false;
    } finally {
      updateState({ isLoading: false });
    }
  };

  return {
    ...state,
    updateState,
    sendOTP,
    verifyOTP,
    resetPassword,
    setStep,
  };
}