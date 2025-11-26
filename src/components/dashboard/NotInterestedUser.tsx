import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileImage from "../components/ProfileImage";

import { useGetNotInterestedUsers } from "@/lib/react-query/queries";
import { useRemoveFromNotInterested } from "@/lib/react-query/mutation";

export default function NotInterestedUser() {
  const navigation = useNavigation();
  const { data, isLoading, error } = useGetNotInterestedUsers();
  const { mutate, isPending } = useRemoveFromNotInterested();

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#777"
        style={{ marginTop: 30 }}
      />
    );
  }

  if (error) {
    return (
      <View style={styles.errorBox}>
        <Text style={styles.errorTitle}>Error loading users</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.headerTitle}>Not Interested Users</Text>

      {data?.users.length === 0 ? (
        <Text style={styles.noUsers}>No users found.</Text>
      ) : (
        <FlatList
          data={data?.users}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", { id: item.id })
                }
                style={styles.userLeft}
              >
                <ProfileImage
                  fullName={item.fullName}
                  image={item.image}
                  size="sm"
                />

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.subText}>
                    {item.type === "helpers"
                      ? "Start giving help to"
                      : "Start taking help from"}
                  </Text>

                  <Text style={styles.userName}>{item.fullName}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.restoreBtn}
                onPress={() => mutate(item._id)}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator size={14} color="#fff" />
                ) : (
                  <Text style={styles.restoreText}>Restore</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 12,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#222",
  },
  noUsers: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFE5E5",
    borderColor: "#FFB3B3",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  userLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  subText: {
    fontSize: 12,
    color: "#888",
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  restoreBtn: {
    backgroundColor: "green",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: "center",
  },
  restoreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  errorBox: {
    padding: 20,
    alignItems: "center",
  },
  errorTitle: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
  errorMessage: {
    color: "#555",
    marginTop: 6,
  },
});