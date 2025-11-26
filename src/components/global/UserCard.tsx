import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "../../types";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const location = JSON.parse(user.currentLocation);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.row}>
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Caste:</Text> {user.caste}
        </Text>
      </View>

      {/* Details */}
      <View style={[styles.row, styles.details]}>
        <Text style={styles.text}>
          <Text style={styles.bold}>Sector:</Text> {user.sector}
        </Text>

        {user.professoin && (
          <Text style={styles.text}>
            <Text style={styles.bold}>Profession:</Text>{" "}
            {user.professoin || "Not specified"}
          </Text>
        )}

        <Text style={styles.text}>
          <Text style={styles.bold}>Location:</Text>{" "}
          {location.city}, {location.state}, {location.country}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  details: {
    marginTop: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  email: {
    fontSize: 12,
    color: "#555",
  },
  text: {
    fontSize: 12,
    color: "#333",
  },
  bold: {
    fontWeight: "600",
  },
});
