import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useGetInfiniteUsers } from "../../lib/react-query/queries";
import { User } from "../../types";
import { UserCard } from "./UserCard";

export function UserSearchDailog() {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteUsers(searchTerm);

  const users: User[] = data?.pages.flatMap((p) => p.rows) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!visible) {
      Keyboard.dismiss();
      setSearchTerm("");
    }
  }, [visible]);

  return (
    <>
      {/* Trigger */}
      <Pressable style={styles.searchBox} onPress={() => setVisible(true)}>
        <Icon name="search" size={18} color="#6b7280" />
        <Text style={styles.searchPlaceholder}>
          Search users by role, sector, name, email...
        </Text>
      </Pressable>

      {/* Modal */}
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => setVisible(false)}>
              <Icon name="x" size={22} />
            </Pressable>

            <View style={styles.inputWrapper}>
              <Icon name="search" size={16} color="#6b7280" />
              <TextInput
                autoFocus
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search users..."
                style={styles.input}
              />
              {isLoading && (
                <ActivityIndicator size="small" color="#3b82f6" />
              )}
            </View>
          </View>

          {/* Results */}
          {users.length > 0 ? (
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <UserCard user={item} />}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isFetchingNextPage ? (
                  <ActivityIndicator style={{ marginVertical: 16 }} />
                ) : null
              }
            />
          ) : (
            <View style={styles.empty}>
              {isLoading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Text style={styles.emptyText}>
                  {searchTerm
                    ? "No users found"
                    : "Start typing to search users"}
                </Text>
              )}
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    gap: 8,
  },

  searchPlaceholder: {
    color: "#6b7280",
    fontSize: 14,
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },

  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 10,
    gap: 8,
  },

  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#6b7280",
    fontSize: 14,
  },
});
