import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod Schema
const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

// Mock API and Toast setup for RN environment
// NOTE: authApi.verifyOtp and showToast must be defined globally or passed as props
const showToast = ({ title, description }) => {
    alert(`${title}: ${description}`);
};

const authApi = {
    verifyOtp: async (phoneNumber, otp) => {
      // Mock verification logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: otp === '1234' }; // Simple mock success condition
    }
};

/**
 * @typedef {Object} OtpVerificationProps
 * @property {string} phoneNumber - The phone number for which OTP was sent.
 * @property {() => void} onVerified - Callback function on successful OTP verification.
 * @property {({ phoneNumber: string }) => void} onResendOtp - Function to resend OTP.
 */

/**
 * OtpVerification component for React Native.
 * @param {OtpVerificationProps} props
 */
export function OtpVerification({
  phoneNumber,
  onVerified,
  onResendOtp,
}) {
  // Removed TS type annotation <boolean>
  const [isLoading, setIsLoading] = useState(false);
  
  // Replaced Web hook 'useToast' with the simple 'showToast' function defined above
  const toast = showToast; 

  // Removed TS type annotation <OtpFormValues>
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Removed TS type annotation (values: OtpFormValues)
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      
      // Call the mock API (Replace with actual backend call)
      const { success } = await authApi.verifyOtp(phoneNumber, values.otp);
      
      if (success) {
        onVerified();
      } else {
        toast({
          title: "Error",
          description: "Invalid OTP. Please try again.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <Form> and <form> replaced by single View
    <View style={styles.formContainer}>
      
      {/* Informational Text */}
      <Text style={styles.infoText}>
        OTP has been sent to +91 {phoneNumber}. Please enter the code below.
      </Text>

      {/* FormField / OTP Input */}
      <Controller
        control={form.control}
        name="otp"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputBox}>
            {/* FormLabel equivalent */}
            <Text style={styles.label}>Verification Code</Text>
            
            {/* FormControl equivalent */}
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="Enter 4-digit OTP"
              keyboardType="number-pad"
              maxLength={4}
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              secureTextEntry={false}
            />
            {/* FormMessage equivalent */}
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Button 1: Verify OTP */}
      <TouchableOpacity
        style={[styles.buttonPrimary, isLoading && styles.buttonDisabled]}
        onPress={form.handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonTextPrimary}>Verify OTP</Text>
        )}
      </TouchableOpacity>
      
      {/* Button 2: Resend OTP (variant="outline") */}
      <TouchableOpacity
        style={[styles.buttonOutline, isLoading && styles.buttonDisabled]}
        onPress={() => onResendOtp({ phoneNumber })} // Call the resend function
        disabled={isLoading}
      >
        <Text style={styles.buttonTextOutline}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

// ----------------------------------------------------
// RN StyleSheet 
// ----------------------------------------------------

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputBox: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    height: 48,
    fontSize: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: 'white',
    textAlign: 'center', // Center text for OTP input
  },
  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  buttonPrimary: {
    backgroundColor: '#1d4ed8', // Primary color
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonOutline: {
    backgroundColor: 'white', // Outline variant: White background
    borderWidth: 1,
    borderColor: '#ccc', // Light gray border
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonTextPrimary: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextOutline: {
    color: '#333', // Dark text for outline button
    fontSize: 16,
    fontWeight: 'bold',
  },
});