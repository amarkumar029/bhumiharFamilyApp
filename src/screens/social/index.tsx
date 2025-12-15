import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

import CheckOutList from "../../components/dashboard/CheckOutList";
import NotInterestedUser from "../../components/dashboard/NotInterestedUser";
import ProfileCompletion from "../../components/dashboard/ProfileCompletion";
import RandomPostCard from "../../components/dashboard/RandomPostCard";
import RecentChats from "../../components/dashboard/RecentChats";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>Welcome to your Dashboard</Text>
        </View>

        {/* Cards Layout */}
        <View style={styles.grid}>
          <ProfileCompletion />

          <CheckOutList />

          <RecentChats />

          <RandomPostCard />

          <NotInterestedUser />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // gray-100
  },
  innerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  header: {
    marginBottom: 16,
  },
  heading: {
    fontSize: isTablet ? 24 : 18,
    fontWeight: "600",
    color: "#111827",
  },
  grid: {
    gap: 12,
  },
});