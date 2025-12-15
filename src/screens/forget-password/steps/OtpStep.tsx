import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
// Removed type import for React.FormEvent

// Removed type annotations for interface OtpStepProps 
/**
 * @typedef {Object} OtpStepProps
 * @property {string} otp
 * @property {string} phoneNumber
 * @property {boolean} isLoading
 * @property {string | null} error
 * @property {(value: string) => void} onOtpChange
 * @property {() => void} onSubmit
 * @property {() => void} onBack
 * @property {() => void} onResendOtp
 */

/**
 * OtpStep component for React Native.
 * @param {OtpStepProps} props
 */
export function OtpStep({
  otp,
  phoneNumber,
  isLoading,
  error,
  onOtpChange,
  onSubmit,
  onBack,
  onResendOtp,
}) {
  // In React Native, we use the onPress handler directly on the button/TouchableOpacity
  // and handle logic separation within the component or its parent.
  // The logic for handling submission is simpler than Web forms.

  return (
    // <form> replaced by View
    <View style={styles.formContainer}>
      
      {/* Input Field Container (space-y-2) */}
      <View style={styles.inputBox}>
        {/* Label equivalent */}
        <Text style={styles.label}>Verification Code</Text>
        
        {/* Description text */}
        <Text style={styles.descriptionText}>
          Enter the 4-digit code sent to +91 {phoneNumber}
        </Text>
        
        {/* Input component replaced by TextInput */}
        <TextInput
          style={[styles.input, { textAlign: 'center' }]}
          placeholder="Enter 4-digit OTP"
          value={otp}
          onChangeText={onOtpChange}
          maxLength={4}
          keyboardType="number-pad"
          // required logic is typically handled by the parent component's validation
          editable={!isLoading} // disabled={isLoading}
        />
        
        {/* Error message */}
        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
      
      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.buttonPrimary, isLoading && styles.buttonDisabled]}
        onPress={onSubmit} // Direct call to onSubmit prop
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonTextPrimary}>Verify OTP</Text>
        )}
      </TouchableOpacity>
      
      {/* Back and Resend Buttons */}
      <View style={styles.actionRow}>
        {/* Back Button (variant="ghost") */}
        <TouchableOpacity
          style={styles.buttonGhost}
          onPress={onBack}
          disabled={isLoading}
        >
          <Text style={styles.buttonTextGhost}>Back</Text>
        </TouchableOpacity>
        
        {/* Resend Button (variant="link") */}
        <TouchableOpacity
          style={styles.buttonLink}
          onPress={onResendOtp}
          disabled={isLoading}
        >
          <Text style={styles.buttonTextLink}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ----------------------------------------------------
// RN StyleSheet 
// ----------------------------------------------------

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    gap: 16, // space-y-4
  },
  inputBox: {
    gap: 8, // space-y-2
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
    color: '#6b7280', // text-gray-500
  },
  input: {
    height: 48, // h-12
    fontSize: 16, // text-base
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6, // rounded-md
    backgroundColor: 'white',
  },
  errorMessage: {
    fontSize: 14, // text-sm
    color: 'red', // text-red-500
  },
  
  // Primary Button (Verify OTP)
  buttonPrimary: {
    backgroundColor: '#1d4ed8', // Primary color (adjust as needed)
    height: 48, // h-12
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // w-full
  },
  buttonTextPrimary: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // justify-between
    alignItems: 'center', // items-center
    paddingTop: 8, // pt-2
  },
  
  // Ghost Button (Back)
  buttonGhost: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    // Ghost variant is transparent
  },
  buttonTextGhost: {
    color: '#6b7280', // Text color for sm/ghost
    fontSize: 14,
    fontWeight: '500',
  },

  // Link Button (Resend OTP)
  buttonLink: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    // Link variant is minimal/link style
  },
  buttonTextLink: {
    color: '#ea580c', // text-orange-600
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline', // Optional link style
  },
  
  buttonDisabled: {
    opacity: 0.6,
  },
});