import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Replace useNavigate and Link

// IMPORTANT: Ensure your step components are already converted to React Native
// Example:
// import { PhoneStep } from "./steps/PhoneStepNative"; 
// import { OtpStep } from "./steps/OtpStepNative";
// import { ResetPasswordStep } from "./steps/ResetPasswordStepNative";

// --- MOCK/PLACEHOLDER DEFINITIONS (Replace with your actual RN implementation) ---
// Mock Hook definition (You must implement this hook for your RN project)
const useForgetPassword = () => {
  const [step, setStep] = React.useState("phone"); // 'phone' | 'otp' | 'reset'
  const [isLoading, setIsLoading] = React.useState(false);
  const [state, setState] = React.useState({
    phoneNumber: '9876543210', // Mock initial data
    otp: '',
    password: '',
    confirmPassword: '',
    error: null,
  });

  const updateState = (newValues) => {
    setState(prev => ({ ...prev, ...newValues }));
  };

  // Mock API functions for flow demonstration
  const sendOTP = async () => { setIsLoading(true); await new Promise(r => setTimeout(r, 1000)); setIsLoading(false); setStep('otp'); return true; };
  const verifyOTP = async () => { setIsLoading(true); await new Promise(r => setTimeout(r, 1000)); setIsLoading(false); setStep('reset'); return true; };
  const resetPassword = async () => { setIsLoading(true); await new Promise(r => setTimeout(r, 1000)); setIsLoading(false); return true; };

  return {
    ...state,
    step,
    isLoading,
    updateState,
    sendOTP,
    verifyOTP,
    resetPassword,
    setStep,
  };
};

// Mock Routes definition (adjust to your React Navigation setup)
const ROUTES = {
  LOGIN: "LoginScreen",
};

// Mock Step Components (Replace with your actual converted components)
const PhoneStep = (props) => (
  <View><Text>Phone Step Content</Text></View>
); 
const OtpStep = (props) => (
  <View><Text>OTP Step Content for {props.phoneNumber}</Text></View>
);
const ResetPasswordStep = (props) => (
  <View><Text>Reset Password Step Content</Text></View>
);
// --- END MOCK DEFINITIONS ---

export default function ForgotPasswordPage() {
  const navigation = useNavigation();
  
  const {
    phoneNumber,
    otp,
    password,
    confirmPassword,
    step,
    isLoading,
    error,
    updateState,
    sendOTP,
    verifyOTP,
    resetPassword,
    setStep,
  } = useForgetPassword();

  const handleResetPassword = async () => {
    const success = await resetPassword();
    if (success) {
      // Navigate to login screen after successful password reset
      navigation.navigate(ROUTES.LOGIN);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "phone":
        return (
          <PhoneStep
            phoneNumber={phoneNumber}
            isLoading={isLoading}
            error={error}
            onPhoneNumberChange={(value) => updateState({ phoneNumber: value })}
            onSubmit={sendOTP}
          />
        );
      case "otp":
        return (
          <OtpStep
            otp={otp}
            phoneNumber={phoneNumber}
            isLoading={isLoading}
            error={error}
            onOtpChange={(value) => updateState({ otp: value })}
            onSubmit={verifyOTP}
            onBack={() => setStep("phone")}
            onResendOtp={sendOTP}
          />
        );
      case "reset":
        return (
          <ResetPasswordStep
            password={password}
            confirmPassword={confirmPassword}
            isLoading={isLoading}
            error={error}
            onPasswordChange={(value) => updateState({ password: value })}
            onConfirmPasswordChange={(value) =>
              updateState({ confirmPassword: value })
            }
            onSubmit={handleResetPassword}
            onBack={() => setStep("otp")}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "phone":
        return "Forgot Password";
      case "otp":
        return "Verify OTP";
      case "reset":
        return "Reset Password";
      default:
        return "Forgot Password";
    }
  };

  // Logic for the progress bar width
  const getProgressWidth = () => {
    if (step === "phone") return "33.3%";
    if (step === "otp") return "66.6%";
    if (step === "reset") return "100%";
    return "0%";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          
          <View style={styles.header}>
            <Text style={styles.title}>{getStepTitle()}</Text>
            
            <Text style={styles.signInText}>
              {step === "phone" && (
                <>
                  Remember your password?{" "}
                  {/* Using TouchableOpacity or Text with onPress for link functionality */}
                  <Text
                    // onPress={() => navigation.navigate(ROUTES.LOGIN)}
                     onPress={() => navigation.navigate('Login')}
                    style={styles.signInLink}>
                    Sign in
                  </Text>
                </>
              )}
            </Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: getProgressWidth() },
                ]}
              />
            </View>
            <View style={styles.progressLabels}>
              <Text style={step === "phone" ? styles.labelActive : styles.labelText}>
                Phone
              </Text>
              <Text style={step === "otp" ? styles.labelActive : styles.labelText}>
                Verification
              </Text>
              <Text style={step === "reset" ? styles.labelActive : styles.labelText}>
                New Password
              </Text>
            </View>
          </View>

          {/* Form Content */}
          <View style={styles.formCard}>
            {renderStep()}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ----------------------------------------------------
// RN StyleSheet 
// ----------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', // bg-white
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20, // px-4 sm:px-6 lg:px-8
  },
  container: {
    width: '100%',
    maxWidth: 400, // max-w-md
    alignSelf: 'center',
    gap: 32, // space-y-8 (approx)
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28, // text-3xl
    fontWeight: 'bold',
    color: '#1f2937', // text-gray-900
  },
  signInText: {
    marginTop: 8, // mt-2
    fontSize: 14, // text-sm
    color: '#6b7280', // text-gray-600
    textAlign: 'center',
  },
  signInLink: {
    fontWeight: '600', // font-medium
    color: '#ea580c', // text-orange-600
  },
  
  // Progress Bar Styles
  progressContainer: {
    paddingTop: 16, // pt-4
    marginBottom: 10,
  },
  progressBarBackground: {
    overflow: 'hidden',
    height: 8, // h-2
    borderRadius: 4, 
    backgroundColor: '#e5e7eb', // bg-gray-200
    marginBottom: 8, // mb-4
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#f97316', // bg-orange-500
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 12,
    color: '#6b7280', // text-gray-500
  },
  labelActive: {
    fontSize: 12,
    color: '#f97316', // text-orange-500
    fontWeight: '600', // font-medium
  },

  // Form Card Styles
  formCard: {
    backgroundColor: 'white', // bg-white-1
    paddingVertical: 32, // py-8
    paddingHorizontal: 24, // px-6 sm:px-10
    borderRadius: 8, // sm:rounded-lg
    // Shadow equivalent (shadow)
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
  },
});