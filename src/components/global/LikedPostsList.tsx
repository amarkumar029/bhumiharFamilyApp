import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Heart } from "lucide-react-native";
import PostCard from "./PostCard";
import { useMyInfiniteLikedPosts } from "../../lib/react-query/queries";
import { useLikePost } from "../../lib/react-query/mutation";

const LikedPostsList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyInfiniteLikedPosts();
  const { mutate } = useLikePost();

  // Flatten pages into a single array
  const posts = data?.pages.flatMap((page) => page?.posts || []) || [];

  const isEmpty = posts.length === 0;

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.postContainer}>
      <PostCard
        isListItem
        post={item}
        showActions
        onLike={() => mutate(item.id)}
      />
    </View>
  );

  return (
    <FlatList
      data={isEmpty ? [] : posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <View style={styles.iconWrapper}>
            <Heart size={40} color="#EF4444" />
          </View>
          <Text style={styles.emptyTitle}>No Liked Posts Yet!</Text>
          <Text style={styles.emptyText}>
            Start exploring and liking posts that interest you. They'll appear
            here!
          </Text>
        </View>
      }
      ListFooterComponent={() =>
        hasNextPage ? (
          <View style={styles.footer}>
            {isFetchingNextPage ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#6B7280" />
                <Text style={styles.loadingText}>Loading liked posts...</Text>
              </View>
            ) : (
              <Text style={styles.scrollText}>Scroll to load more</Text>
            )}
          </View>
        ) : posts.length > 0 ? (
          <View style={styles.footerEnd}>
            <Text style={styles.footerEndTitle}>
              That's all your liked posts!
            </Text>
            <Text style={styles.footerEndText}>
              You've reached the end of your liked posts.
            </Text>
          </View>
        ) : null
      }
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
    overflow: "hidden",
  },
  emptyContainer: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 24,
    alignItems: "center",
    marginBottom: 12,
  },
  iconWrapper: {
    backgroundColor: "#FEE2E2",
    borderRadius: 9999,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "#6B7280",
    fontSize: 14,
  },
  scrollText: {
    fontSize: 14,
    color: "#6B7280",
  },
  footerEnd: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  footerEndTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  footerEndText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default LikedPostsList;