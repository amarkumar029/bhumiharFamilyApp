import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {};

const ChatDefaultDisplay: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image
          source={require("../../assets/chatting.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>
          Start the chat with BHUMIHAR community members
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "60%",       // ✅ similar to w-1/3
    aspectRatio: 1,
    marginBottom: 16,
  },
  text: {
    fontSize: 14,       // ✅ text-sm
    color: "#2563EB",   // ✅ text-blue-3 equivalent
    textAlign: "center",
    paddingHorizontal: 16,
  },
});

export default ChatDefaultDisplay;