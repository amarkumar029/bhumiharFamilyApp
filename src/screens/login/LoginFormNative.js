import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Correct Lucide imports for React Native
// import { Eye, EyeOff, LogIn, AlertTriangle, CheckCircle } from "lucide-react-native";
import Eye from 'react-native-vector-icons/Feather';
import EyeOff from 'react-native-vector-icons/Feather';

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be 6 characters"),
});

// type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginFormNative() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const { control, handleSubmit } = useForm<LoginFormValues>({
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Login Success!");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Icon + Title */}
      <View style={styles.header}>
        {/* <LogIn size={48} color="#2563eb" /> */}
        <Text style={styles.title}>Login</Text>
      </View>

      {/* Identifier Field */}
      <Controller
        control={control}
        name="identifier"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Email / Phone"
                value={value}
                onChangeText={onChange}
              />
            </View>
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <View style={styles.inputBox}>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff name="eye-off" size={22} /> : <Eye name="eye" size={22} />}
                </TouchableOpacity>
              </View>
            </View>
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // padding: 20,
    // backgroundColor: "#f3f4f6",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  inputBox: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    // borderWidth: 1,
    // borderColor: "#ccc",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    // borderWidth: 1,
    // borderColor: "#ccc",
    // paddingHorizontal: 14,
    paddingRight: 10,
    borderRadius: 10,
  },
  error: {
    marginTop: 3,
    color: "red",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#ff5c00",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
