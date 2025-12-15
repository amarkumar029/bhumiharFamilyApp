import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { ApiError } from "../../types";

type ErrorDisplayProps = {
  error: ApiError | Error | unknown;
  onRetry?: () => void;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
}) => {
  let errorMessage = "Something went wrong. Please try again.";
  let statusCode: number | undefined;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "object" && error !== null) {
    const apiError = error as Partial<ApiError>;
    if (apiError.message) errorMessage = apiError.message;
    if (apiError.statusCode) statusCode = apiError.statusCode;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {statusCode ? statusCode : "Error"}
      </Text>

      <Text style={styles.title}>{errorMessage}</Text>

      <Text style={styles.subtitle}>
        {statusCode === 404
          ? "The user profile you're looking for doesn't exist or may have been removed."
          : "We encountered an issue while loading this profile."}
      </Text>

      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  status: {
    fontSize: 48,          // text-5xl
    color: "#EF4444",      // red-500
    marginBottom: 16,
    fontWeight: "700",
  },
  title: {
    fontSize: 18,          // text-xl
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563",      // gray-600
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: "#3B82F6", // blue-500
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ErrorDisplay;