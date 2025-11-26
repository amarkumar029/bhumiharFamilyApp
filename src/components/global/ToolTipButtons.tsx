import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RootState } from "@/store";

interface Count {
  profileCompletion?: string;
  canHelpOutCount?: number;
  canSeekHelpCount?: number;
}

export default function ToolTipButtons({ count }: { count: Count }) {
  const navigation = useNavigation<any>();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      {/* Help People */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Seekers")}
      >
        <Ionicons name="people-outline" size={18} color="#fff" />
        <Text style={styles.badge}>
          {count?.canHelpOutCount || 0}
        </Text>
      </TouchableOpacity>

      {/* Seek Help */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Helpers")}
      >
        <Ionicons name="people-circle-outline" size={18} color="#fff" />
        <Text style={styles.badge}>
          {count?.canSeekHelpCount || 0}
        </Text>
      </TouchableOpacity>

      {/* Matrimonial Interest */}
      {user?.isMatrimonialProfile && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MatrimonialInterest")}
        >
          <Ionicons name="chatbubble-heart-outline" size={18} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#2563EB", // blue-600
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#EA580C", // orange-600
    width: 18,
    height: 18,
    borderRadius: 9,
    textAlign: "center",
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    overflow: "hidden",
  },
});
