import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import MatrimonialProfiles from "../../components/global/MatrimonialProfiles";
import { RootState } from "../../store";
import { useRecommendedProfiles } from "../../lib/react-query/queries";

export default function Index() {
  const { isLoading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useRecommendedProfiles();

  const profiles =
    data?.pages.flatMap((page: any) => page.profiles) || [];

  const handleInterestSent = async (profileId: string) => {
    // UI refresh after interest sent
    await refetch();
  };

  if (authLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recommended Matches</Text>

      <View style={styles.content}>
        <MatrimonialProfiles
          error={null}
          loading={isLoading}
          profiles={profiles}
          hasMore={!!hasNextPage}
          onLoadMore={fetchNextPage}
          isFetchingMore={isFetchingNextPage}
          onInterestSent={handleInterestSent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  heading: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 16,
    color: "#111827",
  },
  content: {
    flex: 1,
  },
});
