import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Bhumihar Family</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  title: {
    color: '#F97316',
    fontSize: 18,
    fontWeight: "700",
  },
});
