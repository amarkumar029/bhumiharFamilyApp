import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

interface SendMessageButtonProps {
  userId: string;
  userName: string;
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "default" | "lg";
}

export default function SendMessageButton({
  userId,
  userName,
  variant = "default",
  size = "default",
}: SendMessageButtonProps) {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate("ChatNew", {
      userId,
      userName,
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Icon name="chatbubble-outline" size={16} color={getTextColor(variant)} />
        <Text style={[styles.text, { color: getTextColor(variant) }]}>
          Message
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const getTextColor = (variant: string) => {
  switch (variant) {
    case "outline":
      return "#2563eb";
    case "secondary":
      return "#111827";
    default:
      return "#ffffff";
  }
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
  },

  /* Variants */
  default: {
    backgroundColor: "#2563eb",
  },

  outline: {
    borderWidth: 1,
    borderColor: "#2563eb",
    backgroundColor: "transparent",
  },

  secondary: {
    backgroundColor: "#e5e7eb",
  },

  /* Sizes */
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  defaultSize: {
    paddingVertical: 8,
  },

  lg: {
    paddingVertical: 12,
  },
});
