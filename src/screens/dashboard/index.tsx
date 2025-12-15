import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";

import ProfileCompletion from "../../components/dashboard/ProfileCompletion";
import CheckOutList from "../../components/dashboard/CheckOutList";
import RecentChats from "../../components/dashboard/RecentChats";
import RandomPostCard from "../../components/dashboard/RandomPostCard";
import NotInterestedUser from "../../components/dashboard/NotInterestedUser";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>      
      {/* TITLE */}
      <Text style={styles.title}>Welcome to your Dashboard</Text>

      {/* GRID SYSTEM (Flexbox) */}
      <View style={styles.grid}>
        
        {/* Profile Completion */}
        <View style={styles.itemWide}>
          <ProfileCompletion />
        </View>

        {/* CheckOut List */}
        <View style={styles.itemWide}>
          <CheckOutList />
        </View>

        {/* Recent Chats */}
        <View style={styles.itemWide}>
          <RecentChats />
        </View>

        {/* Random Posts */}
        <View style={styles.itemWide}>
          <RandomPostCard />
        </View>

        {/* Not Interested Users */}
        <View style={styles.itemWide}>
          <NotInterestedUser />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingTop: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // gap: 12,
  },

  itemSmall: {
    width: "48%",  // Like col-span-1 on wider screens
  },

  itemLarge: {
    width: "48%",  // Same width; components manage height
  },

  itemWide: {
    width: "100%", // Full width components
  },
});