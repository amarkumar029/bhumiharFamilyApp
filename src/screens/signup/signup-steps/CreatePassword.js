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
// If using 'react-native-vector-icons' (e.g., from FontAwesome or Ionicons)
// import Icon from 'react-native-vector-icons/Ionicons'; 
// For simplicity, we use a simple Text component for the eye icon in this example.

// Zod Schema
const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Mock Auth and Toast setup
const showToast = ({ title, description }) => {
    alert(`${title}: ${description}`);
};

// Mock useAuth hook (Replace with your actual RN authentication service/context)
const useAuth = () => ({
    signup: async ({ phoneNumber, password }) => {
        // Mock signup logic (e.g., API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(`Mock Signup: Phone: ${phoneNumber}, Password: ${password}`);
        
        // Assuming signup redirects or succeeds upon completion.
        // In a real app, handle navigation success here.
        return { success: true };
    }
});


/**
 * @typedef {Object} CreatePasswordProps
 * @property {string} phoneNumber - The phone number of the user.
 */

/**
 * CreatePassword component for React Native.
 * @param {CreatePasswordProps} props
 */
export function CreatePassword({ phoneNumber }) {
  const { signup } = useAuth(); // Mock hook
  const toast = showToast; // Mock toast function
  
  // Removed TS type annotations
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Removed TS type annotation <PasswordFormValues>
  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Removed TS type annotation (values: PasswordFormValues)
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      await signup({
        phoneNumber,
        password: values.password,
      });
      // Optionally navigate to Home/Dashboard on success
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <View style={styles.formContainer}>
      
      {/* Password Field */}
      <Controller
        control={form.control}
        name="password"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputBox}>
            <Text style={styles.label}>Password</Text>
            
            {/* The 'div className="relative"' container */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Create a password"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                secureTextEntry={!showPassword} // Toggle security
                // Note: RN TextInput does not have 'type' property
              />
              
              {/* Button element replaced by TouchableOpacity */}
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}
                disabled={isLoading}
              >
                {/* Replaced <EyeOff size={20} /> / <Eye size={20} /> */}
                <EyeIcon visible={showPassword} />
              </TouchableOpacity>
            </View>
            
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Confirm Password Field */}
      <Controller
        control={form.control}
        name="confirmPassword"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputBox}>
            <Text style={styles.label}>Confirm Password</Text>
            
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                secureTextEntry={!showConfirmPassword} // Toggle security
              />
              
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={toggleConfirmPasswordVisibility}
                disabled={isLoading}
              >
                {/* Replaced <EyeOff size={20} /> / <Eye size={20} /> */}
                <EyeIcon visible={showConfirmPassword} />
              </TouchableOpacity>
            </View>
            
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.buttonPrimary, isLoading && styles.buttonDisabled]}
        onPress={form.handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonTextPrimary}>Create Account</Text>
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
    paddingTop: 10,
    paddingBottom: 20,
    // Equivalent to className="space-y-4"
  },
  inputBox: {
    marginBottom: 16, // space-y-4 equivalent spacing
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
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
    fontSize: 16, // text-base
    paddingHorizontal: 12,
    paddingRight: 40, // Ensure space for the icon (pr-10)
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6, // rounded-md
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, // absolute right-2
    padding: 5,
  },
  iconText: {
    fontSize: 20,
    color: '#6b7280', // text-gray-500
  },
  buttonPrimary: {
    backgroundColor: '#1d4ed8', // Primary color
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // w-full
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
});