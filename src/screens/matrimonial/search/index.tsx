import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchForm from "../../../components/form/SearchForm";

export default function Search() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.heading}>Find Your Perfect Match</Text>
        <SearchForm />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // bg-gray-50
  },
  inner: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 28,        // text-3xl
    fontWeight: "700",   // font-bold
    textAlign: "center",
    color: "#111827",    // text-gray-900
    marginBottom: 24,
  },
});
