import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatusBadgeProps {
  status: "ACCEPTED" | "DECLINED" | "PENDING" | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { container, text, label } = getStyles(status);

  return (
    <View style={container}>
      <Text style={text}>{label}</Text>
    </View>
  );
}

function getStyles(status: string) {
  switch (status) {
    case "ACCEPTED":
      return {
        label: "Accepted",
        container: styles.acceptedContainer,
        text: styles.acceptedText,
      };

    case "DECLINED":
      return {
        label: "Declined",
        container: styles.declinedContainer,
        text: styles.declinedText,
      };

    case "PENDING":
    default:
      return {
        label: "Pending",
        container: styles.pendingContainer,
        text: styles.pendingText,
      };
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  baseText: {
    fontSize: 12,
    fontWeight: "600",
  },

  acceptedContainer: {
    backgroundColor: "#DCFCE7", // green-100
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  acceptedText: {
    color: "#166534", // green-800
    fontSize: 12,
    fontWeight: "600",
  },

  declinedContainer: {
    backgroundColor: "#FEE2E2", // red-100
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  declinedText: {
    color: "#991B1B", // red-800
    fontSize: 12,
    fontWeight: "600",
  },

  pendingContainer: {
    backgroundColor: "#FEF9C3", // yellow-100
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  pendingText: {
    color: "#854D0E", // yellow-800
    fontSize: 12,
    fontWeight: "600",
  },
});
