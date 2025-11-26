import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod Schema (unchanged, as it is validation logic)
const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Invalid phone number"),
});

// Since the project seems to be JS, we define the props using JSDoc for clarity
/**
 * @typedef {Object} PhoneFormValues
 * @property {string} phoneNumber
 */

/**
 * @typedef {Object} PhoneVerificationProps
 * @property {(values: PhoneFormValues) => void} onSubmit
 * @property {boolean} isLoading
 */

/**
 * PhoneVerification component for React Native.
 * @param {PhoneVerificationProps} props
 */
export function PhoneVerification({
  isLoading,
  onSubmit,
}) {
  const form = useForm({ // Removed <PhoneFormValues>
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  return (
    <View style={styles.formContainer}>
      {/* onSubmit maps to the TouchableOpacity onPress event with form.handleSubmit */}
      
      <Controller
        control={form.control}
        name="phoneNumber"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputBox}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="Enter your phone number"
              keyboardType="phone-pad" // Use numeric keyboard for phone number
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              // The form elements (FormItem, FormControl, FormMessage) are replaced by View/Text/TextInput
            />
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Button component is replaced by TouchableOpacity */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={form.handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Get OTP</Text>
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
    fontWeight: '500', // Equivalent to FormLabel style
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
  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1d4ed8', // Example blue color, adjust as per your theme
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});