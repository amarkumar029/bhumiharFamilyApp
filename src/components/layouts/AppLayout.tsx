import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Header from "../global/Header";
import Footer from "../global/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
});
