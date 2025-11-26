import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileImage from "./ProfileImage";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IProps {
  id: string;
  receiver: {
    id: string;
    fullName: string;
    image: string | null;
    profession: string;
    currentLocation: string;
  };
  onWithdraw: (id: string) => void;
}

export default function SentInterestCard({
  receiver,
  id,
  onWithdraw,
}: IProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>Withdraw your sent request</Text>

      <View style={styles.row}>
        <View style={styles.userRow}>
          <ProfileImage
            fullName={receiver.fullName.split(" ")[0]}
            image={receiver.image}
            size="sm"
          />
          <Text style={styles.name}>{receiver.fullName}</Text>
        </View>

        <TouchableOpacity
          style={styles.withdrawButton}
          onPress={() => onWithdraw(id)}
        >
          <Ionicons name="close-outline" size={16} color="#dc2626" />
          <Text style={styles.withdrawText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  subtitle: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 12,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },

  withdrawButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#fecaca",
    backgroundColor: "#fff5f5",
  },

  withdrawText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#dc2626",
    fontWeight: "500",
  },
});
