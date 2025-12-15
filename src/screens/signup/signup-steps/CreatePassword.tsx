import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert, // Used as a simple replacement for the 'toast' hook
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// You need to install and link this library: npm install react-native-vector-icons
import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/toast";


const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface CreatePasswordProps {
  phoneNumber: string;
}

export function CreatePassword({ phoneNumber }: CreatePasswordProps) {
  const { signup } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    try {
      setIsLoading(true);
      await signup({
        phoneNumber,
        password: values.password,
      });
      toast({ title: "Success", description: "Account created successfully!" });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const Eye = <Icon name="eye" size={20} color="#6B7280" />;
  const EyeOff = <Icon name="eye-off" size={20} color="#6B7280" />;
  
  return (
    <View style={styles.container}>
      <Controller
        control={form.control}
        name="password"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View style={styles.formItem}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputContainer, error && styles.inputError]}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Create a password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#A0A0A0"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowPassword(!showPassword)}
                // TabIndex is not a property in React Native, use accessibility props if needed
              >
                {showPassword ? EyeOff : Eye}
              </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View style={styles.formItem}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={[styles.inputContainer, error && styles.inputError]}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#A0A0A0"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? EyeOff : Eye}
              </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={form.handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>{"Create Account"}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// --- Stylesheet (React Native Styling) ---

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  formItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151', // Equivalent to gray-700
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB', // Equivalent to gray-300
    borderRadius: 6, // Equivalent to rounded-md
    height: 48, // Equivalent to h-12
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16, // Equivalent to text-base
    paddingHorizontal: 12,
    color: '#1F2937', // Text color
  },
  inputError: {
    borderColor: '#EF4444', // Red for error state
    borderWidth: 2,
  },
  iconButton: {
    padding: 5,
    // Note: No need for complex transforms in RN styling like in the web example
  },
  errorMessage: {
    marginTop: 6,
    fontSize: 12,
    color: '#EF4444', // Red error message color
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 6,
    backgroundColor: '#F97316', // Equivalent to a blue color
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});