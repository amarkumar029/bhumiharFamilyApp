import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import ProfileImage from "../global/ProfileImage";
import { useGetNotInterestedUsers } from "../../lib/react-query/queries";
import { useRemoveFromNotInterested } from "../../lib/react-query/mutation";

export default function NotInterestedUser() {
  const navigation = useNavigation<any>();
  const { data, isLoading, error } = useGetNotInterestedUsers();
  const { mutate: removeUser, isPending } =
    useRemoveFromNotInterested();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" color="#6b7280" />
      </View>
    );
  }

  if (error) {
    console.log("NOT INTERESTED ERROR 👉", error);

    return (
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>
          {error instanceof Error
            ? error.message
            : "Something went wrong"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="list-outline" size={18} color="#dc2626" />
        <Text style={styles.title}>Not Interested Users</Text>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {data?.users.length === 0 ? (
          <Text style={styles.emptyText}>No users found.</Text>
        ) : (
          data?.users.map((user: any) => (
            <View key={user.id} style={styles.item}>
              {/* USER INFO */}
              <TouchableOpacity
                style={styles.profileRow}
                onPress={() =>
                  navigation.navigate("ProfilePage", {
                    id: user.id,
                  })
                }
              >
                <ProfileImage
                  fullName={user.fullName}
                  image={user.image}
                  size="sm"
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.helperText}>
                    {user.type === "helpers"
                      ? "Start giving help to"
                      : "Start taking help from"}
                  </Text>
                  <Text style={styles.name}>{user.fullName}</Text>
                </View>
              </TouchableOpacity>

              {/* ACTION */}
              <TouchableOpacity
                style={styles.restoreBtn}
                onPress={() => removeUser(user._id)}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons
                      name="checkmark-done-outline"
                      size={14}
                      color="#fff"
                    />
                    <Text style={styles.btnText}>Restore</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

/* -------------------------------- STYLES -------------------------------- */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    padding: 10,
  },
  item: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 11,
    color: "#6b7280",
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  restoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-end",
    backgroundColor: "#16a34a",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 20,
    fontSize: 13,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorBox: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 13,
    textAlign: "center",
  },
});
