import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { PhoneVerification } from "./signup-steps/PhoneVerification"; 
import { OtpVerification } from "./signup-steps/OtpVerification";
import { CreatePassword } from "./signup-steps/CreatePassword";

const COMMUNITY_NAME = "Bhumihar Family";
const LOCAL_STORAGE_KEYS = {
  REGISTER_SECRET_KEY: "register_secret_key",
};
const ROUTES = {
  LOGIN: "LoginScreen",
};

// Removed TS 'type SignupStep = "phone" | "otp" | "password";'
// Removed TS 'type PhoneFormValues = { phoneNumber: string };'

const showToast = ({ title, description, variant = "default" }) => { // Removed ': any'
  alert(`${title}: ${description}`);
};

const authApi = {
  sentOtp: async (phoneNumber) => { // Removed ': string'
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (phoneNumber.length < 10) {
      // Error objects need to be structured correctly for RN
      throw new Error("Invalid phone number format.");
    }

    return { 
      success: true, 
      data: `mock_secret_${phoneNumber.slice(-4)}` 
    };
  },
};

export default function SignupPage() {
  // Removed <SignupStep>
  const [step, setStep] = useState("phone"); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handlePhoneVerified = (phone) => { // Removed ': string'
    setPhoneNumber(phone);
    setStep("otp");
  };

  const handleOtpVerified = () => {
    setStep("password");
  };

  // Removed ': PhoneFormValues'
  const onSubmit = async (values) => { 
    try {
      setIsLoading(true);
      
      const { success, data } = await authApi.sentOtp(values.phoneNumber);
      
      if (success) {
        handlePhoneVerified(values.phoneNumber);
        
        await AsyncStorage.setItem(LOCAL_STORAGE_KEYS.REGISTER_SECRET_KEY, data);
        
        showToast({
          title: "OTP Sent",
          description: "Please check your phone for the verification code.",
        });
      }
    } catch (error) { // <-- FIX: Removed ': any'
      showToast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Removed type definition
  const handleResendOtp = ({ phoneNumber }) => { 
    onSubmit({ phoneNumber });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          
          <View style={styles.header}>
            <Text style={styles.logoText}>{COMMUNITY_NAME}</Text>
          </View>
          
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                Create an account
              </Text>
            </View>

            <View style={styles.formContainer}>
              {step === "phone" && (
                <PhoneVerification onSubmit={onSubmit} isLoading={isLoading} />
              )}
              {step === "otp" && (
                <OtpVerification
                  phoneNumber={phoneNumber}
                  onVerified={handleOtpVerified}
                  onResendOtp={handleResendOtp}
                />
              )}
              {step === "password" && (
                <CreatePassword phoneNumber={phoneNumber} />
              )}
            </View>

            <View style={styles.signInText}>
              <Text>
                Already have an account?{" "}
              </Text>
              <Text
//                 onPress={() => navigation.navigate(ROUTES.LOGIN)}
                onPress={() => navigation.navigate('Login')}
                style={styles.signInLink}
              >
                Sign in
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 16,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff5c00',
  },
  formCard: {
    backgroundColor: 'white',
    paddingVertical: 32,
//     paddingHorizontal: 24,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
    marginBottom: 20,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  signInText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#6b7280',
  },
  signInLink: {
    fontWeight: '600',
    color: '#ea580c',
  },
});