import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Assuming you have a custom toast implementation for React Native
import { toast } from "../../../hooks/toast"; 
import { authApi } from "../../../lib/api/auth";

// --- Schema ---
const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

// --- Props ---
interface OtpVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
  onResendOtp: ({ phoneNumber }: { phoneNumber: string }) => void;
}

export function OtpVerification({
  phoneNumber,
  onVerified,
  onResendOtp,
}: OtpVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  // Assuming useToast provides a function to show toast messages
  // const { toast } = useToast(); // If useToast is a hook
  // If toast is just an imported function (like the web version):
  // const showToast = toast; 

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange", // Enable validation feedback while typing
  });

  const onSubmit = async (values: OtpFormValues) => {
    if (!isValid) return; // Basic guard

    try {
      setIsLoading(true);
      // Ensure authApi.verifyOtp is correctly implemented for RN
      const { success } = await authApi.verifyOtp(phoneNumber, values.otp);
      
      if (success) {
        onVerified();
        toast({ title: "Success", description: "OTP verified successfully.", type: "success" });
      } else {
        // Handle API failure (e.g., incorrect code)
        toast({
          title: "Error",
          description: "Invalid OTP. Please try again.",
          type: "error", // Assuming your toast system supports a 'type' or 'variant'
        });
        reset({ otp: "" }); // Clear OTP field on failure
      }
    } catch (error) {
      // Handle network or system error
      console.error("OTP verification failed:", error);
      toast({
        title: "Error",
        description: "Failed to verify OTP. Check your network.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    // Note: We don't set loading here because the parent (SignupPage) handles it
    onResendOtp({ phoneNumber });
    // You might want to reset the OTP field after resending
    reset({ otp: "" }); 
  };

  return (
    <View style={styles.container}>
      {/* Informational Text */}
      <Text style={styles.infoText}>
        We sent a 4-digit code to {phoneNumber}.
      </Text>

      {/* Verification Code Field (Controller is used for hook-form) */}
      <Controller
        control={control}
        name="otp"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.formItem}>
            <Text style={styles.label}>Verification Code</Text>
            <TextInput
              placeholder="Enter 4-digit OTP"
              // style={[styles.input, errors.otp && styles.inputError]}
              style={[styles.input, errors.otp && styles.inputError]}
              keyboardType="number-pad"
              maxLength={4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              // Focus the field initially for convenience
              autoFocus={true} 
            />
            {errors.otp && (
              <Text style={styles.errorMessage}>{errors.otp.message}</Text>
            )}
          </View>
        )}
      />

      {/* Verify Button (Primary) */}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={[styles.button, styles.primaryButton, (!isValid || isLoading) && styles.disabledButton]}
        disabled={isLoading || !isValid}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </Pressable>

      {/* Resend Button (Outline/Secondary) */}
      <Pressable
        onPress={handleResend}
        style={[styles.button, styles.secondaryButton, isLoading && styles.disabledButton]}
        disabled={isLoading}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Resend OTP
        </Text>
      </Pressable>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    gap: 16, // space-y-4 equivalent
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280', // Gray-500
    textAlign: 'center',
    marginBottom: 10,
  },
  formItem: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937', // Gray-900
    marginBottom: 4,
  },
  input: {
    height: 48, // h-12 equivalent
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB', // Border color
    borderRadius: 6, // rounded-md equivalent
    backgroundColor: '#fff',
    textAlign: 'center', // Center text for OTP field
    // letterSpacing: 8, // Add spacing for OTP readability
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    height: 48,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#F97316', // Orange-600
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB', // Outline variant
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#1F2937', // Dark text for outline button
  },
  disabledButton: {
    opacity: 0.5,
  },
});