import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useGetSentInterests } from "@/lib/react-query/queries";
import { useWithdrawInterest } from "@/lib/react-query/mutation";
import SentInterestCard from "./SentInterestCard";

const PAGE_SIZE = 8;

export default function SentInterest() {
  const { data, isPending: isLoading, error } = useGetSentInterests(PAGE_SIZE);
  const { mutate } = useWithdrawInterest();

  const interests =
    data?.pages?.flatMap((page: any) => page.interests) ?? [];

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!isLoading && error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Something went wrong while fetching data!
        </Text>
      </View>
    );
  }

  if (interests.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>
          You haven't sent any interest yet! Try connecting with users.
        </Text>
      </View>
    );
  }

  const onWithdraw = (id: string) => {
    mutate(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Sent Requests</Text>

      <FlatList
        data={interests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SentInterestCard
            id={item.id}
            receiver={item.receiver}
            onWithdraw={onWithdraw}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 16,
    color: "#111827",
  },

  list: {
    paddingBottom: 16,
    gap: 12,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6b7280",
  },

  errorText: {
    fontSize: 14,
    color: "#dc2626",
    textAlign: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
  },
});
