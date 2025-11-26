import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, ActivityIndicator } from "react-native";
import Animated, { useAnimatedStyle, withSpring, withRepeat, withTiming, Easing } from "react-native-reanimated";

type AnimatedButtonProps = {
  icon: React.ReactNode;
  loadingIcon?: React.ReactNode;
  successIcon?: React.ReactNode;
  text: string;
  successText?: string;
  status: "idle" | "loading" | "success";
  isDisabled: boolean;
  onPress: () => void;
  title?: string;
  style?: object;
};

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  icon,
  loadingIcon,
  successIcon,
  text,
  successText,
  status,
  isDisabled,
  onPress,
  title,
  style = {},
}) => {
  // Animation for loading rotation
  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform:
        status === "loading"
          ? [
              {
                rotate: `${withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1)}deg`,
              },
            ]
          : [],
    };
  });

  // Animation for success scaling
  const successStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: status === "success" ? withSpring(1, { damping: 10 }) : 0,
        },
      ],
      opacity: status === "success" ? 1 : 0,
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled || status === "loading"}
      style={[styles.button, isDisabled && styles.disabledButton, style]}
    >
      {isDisabled ? (
        <View style={styles.content}>
          {successIcon} <Text style={styles.text}>{successText}</Text>
        </View>
      ) : (
        <>
          {status === "idle" && (
            <View style={styles.content}>
              {icon} <Text style={styles.text}>{text}</Text>
            </View>
          )}

          {status === "loading" && (
            <Animated.View style={[styles.content, rotateStyle]}>
              {loadingIcon ?? <ActivityIndicator color="#000" />}
            </Animated.View>
          )}

          {status === "success" && (
            <Animated.View style={[styles.content, successStyle]}>
              {successIcon} {successText && <Text style={styles.text}>{successText}</Text>}
            </Animated.View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  disabledButton: {
    opacity: 0.6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
});
