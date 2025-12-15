import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
// Removed type import for React.FormEvent

// Removed type annotations for interface PhoneStepProps
/**
 * @typedef {Object} PhoneStepProps
 * @property {string} phoneNumber
 * @property {boolean} isLoading
 * @property {string | null} error
 * @property {(value: string) => void} onPhoneNumberChange
 * @property {() => void} onSubmit
 */

/**
 * PhoneStep component for React Native.
 * @param {PhoneStepProps} props
 */
export function PhoneStep({
  phoneNumber,
  isLoading,
  error,
  onPhoneNumberChange,
  onSubmit,
}) {
  // In React Native, the submission logic is handled directly via onPress
  // of the TouchableOpacity, eliminating the need for e.preventDefault() on a <form>.

  return (
    // <form> replaced by View
    <View style={styles.formContainer}>
      
      {/* Input Field Container (space-y-4) */}
      <View style={styles.inputBox}>
        
        {/* Label equivalent */}
        <Text style={styles.label}>Phone Number</Text>
        
        {/* Input component replaced by TextInput */}
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={onPhoneNumberChange}
          keyboardType="phone-pad" // Use appropriate keyboard
          maxLength={10} // Often a useful addition for phone numbers
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
          <Text style={styles.buttonTextPrimary}>Send OTP</Text>
        )}
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
    gap: 16, // space-y-4
  },
  inputBox: {
    gap: 8, // space-y-2 (for label and input/error)
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 48, // h-12
    fontSize: 16, // text-base
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  errorMessage: {
    fontSize: 14, // text-sm
    color: 'red', // text-red-500
    marginTop: 4,
  },
  
  // Primary Button 
  buttonPrimary: {
    backgroundColor: '#1d4ed8', // Primary color (adjust as needed)
    height: 48, // h-12
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // w-full
    marginTop: 10,
  },
  buttonTextPrimary: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});