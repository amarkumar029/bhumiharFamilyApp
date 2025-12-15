import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
// Removed lucide-react icons; using simple Text component for icons.

// Removed type annotations for interface ResetPasswordStepProps
/**
 * @typedef {Object} ResetPasswordStepProps
 * @property {string} password
 * @property {string} confirmPassword
 * @property {boolean} isLoading
 * @property {string | null} error
 * @property {(value: string) => void} onPasswordChange
 * @property {(value: string) => void} onConfirmPasswordChange
 * @property {() => void} onSubmit
 * @property {() => void} onBack
 */

/**
 * ResetPasswordStep component for React Native.
 * @param {ResetPasswordStepProps} props
 */
export function ResetPasswordStep({
  password,
  confirmPassword,
  isLoading,
  error,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack,
}) {
  // Removed TS type annotations
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Icon Placeholder function (replaces Eye/EyeOff from lucide-react)
  const EyeIcon = ({ visible }) => (
    <Text style={styles.iconText}>{visible ? '👁️' : '🔒'}</Text>
  );

  return (
    // <form> replaced by View
    <View style={styles.formContainer}>
      
      {/* New Password Field */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>New Password</Text>
        
        {/* Relative container equivalent */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry={!showPassword}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
            disabled={isLoading}
          >
            <EyeIcon visible={showPassword} />
          </TouchableOpacity>
        </View>
        
        {/* Error message (handled below the confirm field in the original, but placing it here for field-specific feedback if needed) */}
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Confirm Password</Text>
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={onConfirmPasswordChange}
            secureTextEntry={!showConfirmPassword}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={toggleConfirmPasswordVisibility}
            disabled={isLoading}
          >
            <EyeIcon visible={showConfirmPassword} />
          </TouchableOpacity>
        </View>
        
        {/* Central Error display */}
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
          <Text style={styles.buttonTextPrimary}>Reset Password</Text>
        )}
      </TouchableOpacity>
      
      {/* Back Button (variant="ghost") */}
      <TouchableOpacity
        style={styles.buttonGhost}
        onPress={onBack}
        disabled={isLoading}
      >
        <Text style={styles.buttonTextGhost}>Back</Text>
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
  inputSection: {
    gap: 8, // space-y-2
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  // Container for the password field and toggle icon (relative positioning equivalent)
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1, // Takes up remaining space
    height: 48, // h-12
    fontSize: 16,
    paddingHorizontal: 12,
    paddingRight: 40, // Space for the icon (pr-10)
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
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  iconText: {
    fontSize: 20,
    color: '#6b7280', // text-gray-500
  },
  
  // Primary Button (Reset Password)
  buttonPrimary: {
    backgroundColor: '#1d4ed8', // Primary color 
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
  
  // Ghost Button (Back)
  buttonGhost: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    // Ghost variant is transparent, positioned below the main button (mt-2 in web)
    marginTop: 8, 
    alignSelf: 'flex-start', // Align to left/start if needed, or center if styled as full-width.
  },
  buttonTextGhost: {
    color: '#6b7280', // Text color for ghost button
    fontSize: 14,
    fontWeight: '500',
  },

  buttonDisabled: {
    opacity: 0.6,
  },
});