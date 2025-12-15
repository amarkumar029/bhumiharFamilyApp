import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";
// Assuming you have equivalent components for React Native
// You will need to create these files:
import { PhoneVerification } from "./signup-steps/PhoneVerification";
import { OtpVerification } from "./signup-steps/OtpVerification";
import { CreatePassword } from "./signup-steps/CreatePassword";

// ******************************************************
// NOTE: Please define the following utility/constants in your project:
// 1. toast: A React Native compatible toast implementation (e.g., react-native-toast-message)
// 2. authApi: Your custom API wrapper for sending OTP
// 3. COMMUNITY_NAME: Your community name constant (e.g., "Bhumihar Family")
// 4. ROUTES: Your route constants (e.g., { LOGIN: 'LoginScreen' })
// 5. STORAGE_KEYS: Your AsyncStorage keys
// 6. Link equivalent: Navigation prop for moving to the Login screen.
// ******************************************************

// === Types and Schemas ===

type SignupStep = "phone" | "otp" | "password";

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Invalid phone number"),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

// Assuming useAuth is available for RN context, and useToast is RN compatible
import { authApi } from "../../lib/api/auth"; // Change path as needed
import { toast } from "../../hooks/toast"; // Change path as needed
import { COMMUNITY_NAME, STORAGE_KEYS, ROUTES } from "../../constants"; // Change path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// --- Main Component ---
export default function SignupPage() {
  const navigation = useNavigation();

  const [step, setStep] = useState<SignupStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneVerified = (phone: string) => {
    setPhoneNumber(phone);
    setStep("otp");
  };

  const handleOtpVerified = () => {
    setStep("password");
  };

  const onSubmit = async (values: PhoneFormValues) => {
    try {
      setIsLoading(true);
      // Assuming authApi.sentOtp is correctly defined
      const { success, data } = await authApi.sentOtp(values.phoneNumber);

      if (success) {
        handlePhoneVerified(values.phoneNumber);
        // Using AsyncStorage instead of localStorage (Web)
        await AsyncStorage.setItem(STORAGE_KEYS.REGISTER_SECRET_KEY, data);
        toast({
          title: "OTP Sent",
          description: "Please check your phone for the verification code.",
          type: 'success' // Assuming toast supports type
        });
      }
    } catch (error: any) {
      // Improved error handling for React Native
      const errorMessage = error?.response?.data?.message || "Failed to send OTP. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = ({ phoneNumber }: { phoneNumber: string }) => {
    onSubmit({ phoneNumber });
  };

  const renderContent = () => {
    switch (step) {
      case "phone":
        return <PhoneVerification onSubmit={onSubmit} isLoading={isLoading} />;
      case "otp":
        return (
          <OtpVerification
            phoneNumber={phoneNumber}
            onVerified={handleOtpVerified}
            onResendOtp={handleResendOtp}
          />
        );
      case "password":
        return <CreatePassword phoneNumber={phoneNumber} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.communityName}>{COMMUNITY_NAME}</Text>
        </View>

        {/* Content Box */}
        <View style={styles.contentBox}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create an account</Text>
          </View>

          {renderContent()}

          {/* Sign In Link */}
          <Text style={styles.signInText}>
            Already have an account?{" "}
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.LOGIN as never)}
            >
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // White background
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  communityName: {
    fontSize: 48, // Equivalent to text-5xl
    fontWeight: "bold",
    color: "#F97316", // Yellow color (you should replace this with your actual 'text-yellow' color)
  },
  contentBox: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    backgroundColor: "#fff", // Use a light background if needed
    borderRadius: 8,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24, // Equivalent to text-3xl
    fontWeight: "bold",
    color: "#1F2937", // Gray-900 equivalent
  },
  signInText: {
    marginTop: 20,
    fontSize: 14,
    color: "#4B5563", // Gray-600 equivalent
    textAlign: "center",
  },
  signInLink: {
    fontWeight: "600",
    color: "#F97316", // Orange-600 equivalent
    textDecorationLine: 'underline',
  },
});