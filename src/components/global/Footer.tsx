import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 Bhumihar Family</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    // height: 45,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#ffffff",
  },
  text: {
    fontSize: 12,
    color: "#000",
  },
});
