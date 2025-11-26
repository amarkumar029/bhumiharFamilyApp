import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MessageBubble from "./MessageBubble";
import { IChatMessages } from "../../types/chat";

interface MessageListProps {
  messages: IChatMessages[];
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<void>;
  currentUserId: string;
}

export default function MessageList({
  messages,
  isLoading,
  hasNextPage,
  fetchNextPage,
  currentUserId,
}: MessageListProps) {
  const flatListRef = useRef<FlatList>(null);
  const initialLoad = useRef(true);

  // Sort messages (oldest → newest)
  const sortedMessages = [...messages].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  /** Scroll to bottom on first load */
  useEffect(() => {
    if (sortedMessages.length && initialLoad.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
        initialLoad.current = false;
      }, 0);
    }
  }, [sortedMessages.length]);

  /** Load older messages when reaching top */
  const handleLoadMore = async () => {
    if (hasNextPage && !isLoading) {
      await fetchNextPage();
    }
  };

  if (isLoading && messages.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" />
        <Text style={styles.muted}>Loading messages...</Text>
      </View>
    );
  }

  if (messages.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>
          No messages yet. Start the conversation!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={sortedMessages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <MessageBubble
          message={item}
          isCurrentUser={item.senderId === currentUserId}
        />
      )}
      inverted={false}
      onEndReachedThreshold={0.1}
      onEndReached={handleLoadMore}
      ListHeaderComponent={
        hasNextPage ? (
          <View style={styles.loader}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.loadMoreText}>Pull to load older messages</Text>
            )}
          </View>
        ) : null
      }
      maintainVisibleContentPosition={{
        minIndexForVisible: 1,
        autoscrollToTopThreshold: 20,
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  muted: {
    color: "#6b7280",
    marginTop: 8,
  },
  loader: {
    paddingVertical: 10,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#6b7280",
    fontSize: 12,
  },
});
