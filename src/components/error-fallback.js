import React, { useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
// React Native Navigation hook
import { useNavigation } from "@react-navigation/native"; 

interface ErrorFallbackProps {
  // ErrorBoundary FallbackComponent props React Native में समान रहती हैं
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallbackNative({ // Renamed to avoid conflict
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  // useNavigate की जगह useNavigation का उपयोग करें
  const navigation = useNavigation();

  useEffect(() => {
    // Error Logging Logic is reusable
    console.error("Error Boundary Caught:", error);
  }, [error]);

  const handleTryAgain = () => {
    // 1. ErrorBoundary को रीसेट करें
    resetErrorBoundary();
    // 2. होम स्क्रीन पर नेविगेट करें ('Home' आपके Navigation Stack में Route Name होना चाहिए)
    navigation.navigate("Home"); 
  };

  const handleGoBack = () => {
    // एक स्क्रीन पीछे जाएँ
    navigation.goBack();
  };

  return (
    // flex flex-col items-center justify-center min-h-screen p-4
    <View style={styles.container}>
      <View style={styles.content}>
        
        {/* Title */}
        {/* h1 className="mb-4 text-2xl font-bold text-gray-900" */}
        <Text style={styles.title}>
          Something went wrong 🤕
        </Text>
        
        {/* Error Message */}
        {/* pre className="mb-4 p-4 bg-gray-100 rounded-lg overflow-auto text-sm" */}
        <View style={styles.errorBox}>
          {/* ScrollView का उपयोग करें यदि Error Message लंबा हो */}
          <ScrollView>
            <Text style={styles.errorMessageText}>
              {error.message}
            </Text>
          </ScrollView>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          
          {/* Try Again Button (Primary Style) */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleTryAgain}
          >
            <Text style={styles.primaryButtonText}>
              Try again
            </Text>
          </TouchableOpacity>
          
          {/* Go Back Button (Outline Style) */}
          <TouchableOpacity 
            style={styles.outlineButton}
            onPress={handleGoBack}
          >
            <Text style={styles.outlineButtonText}>
              Go back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // min-h-screen
    alignItems: 'center', // items-center
    justifyContent: 'center', // justify-center
    padding: 16, // p-4
    backgroundColor: 'white', 
  },
  content: {
    maxWidth: 400, // max-w-md (approximation)
    width: '100%',
    alignItems: 'center', // text-center
  },
  title: {
    marginBottom: 16, // mb-4
    fontSize: 24, // text-2xl
    fontWeight: '700', // font-bold
    color: '#1f2937', // text-gray-900
    textAlign: 'center',
  },
  errorBox: {
    marginBottom: 16, // mb-4
    padding: 16, // p-4
    backgroundColor: '#f3f4f6', // bg-gray-100
    borderRadius: 8, // rounded-lg
    maxHeight: 150, // Limit height for better display
    width: '100%',
  },
  errorMessageText: {
    fontSize: 12, // text-sm
    color: '#4b5563',
  },
  buttonContainer: {
    flexDirection: 'row', // space-x-4
    gap: 16,
    marginTop: 8,
  },
  // Primary Button Styles
  primaryButton: {
    backgroundColor: '#3b82f6', // Custom Blue for primary
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  // Outline Button Styles
  outlineButton: {
    backgroundColor: 'white', // bg-white
    borderWidth: 1,
    borderColor: '#d1d5db', // border-gray-300
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#4b5563', // text-gray-700
    fontWeight: '600',
    fontSize: 16,
  },
});