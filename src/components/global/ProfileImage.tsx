import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { API_BASE_URL } from "../../constants";
import { getUserInitials } from "../../utils";

interface ProfileImageProps {
  fullName: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
  showAction?: boolean;
  style?: any;
}

export default function ProfileImage({
  fullName,
  image,
  size = "md",
  showAction = false,
  style,
}: ProfileImageProps) {
  const initials = getUserInitials(fullName);

  return (
    <View style={[styles.container, style]}>
      {image ? (
        <Image
          source={{ uri: `${API_BASE_URL}/${image.replace(/\\/g, "/")}` }}
          style={[styles.image, styles[size]]}
        />
      ) : (
        <View style={[styles.image, styles[size], styles.initialsContainer]}>
          <Text style={[styles.initialsText, styles[`${size}Text`]]}>
            {initials}
          </Text>
        </View>
      )}

      {showAction && <View style={styles.onlineDot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  image: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Sizes */
  sm: {
    width: 32,
    height: 32,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 64,
    height: 64,
  },

  /* Initials */
  initialsContainer: {
    backgroundColor: "#DBEAFE", // blue-2 equivalent
  },
  initialsText: {
    fontWeight: "500",
    color: "rgba(0,0,0,0.8)",
  },
  smText: {
    fontSize: 10,
  },
  mdText: {
    fontSize: 14,
  },
  lgText: {
    fontSize: 22,
  },

  /* Online Indicator */
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4ade80", // green-400
    borderWidth: 2,
    borderColor: "#fff",
  },
});
