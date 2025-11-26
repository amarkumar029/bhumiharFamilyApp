import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from "react-native";
import MatrimonialCard from "./MatrimonialCard";
import type { MatrimonialProfile } from "@/types/matrimonial";

interface Props {
  profiles: MatrimonialProfile[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  isFetchingMore: boolean;
  onInterestSent?: (profileId: string) => void;
}

export default function MatrimonialProfiles({
  profiles,
  loading,
  error,
  hasMore,
  onLoadMore,
  isFetchingMore,
  onInterestSent,
}: Props) {
  const renderItem = ({ item }: { item: MatrimonialProfile }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <MatrimonialCard
          profile={item}
          onInterestSent={() => onInterestSent?.(item.id)}
        />
      </Animated.View>
    );
  };

  if (loading && profiles.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={profiles}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      onEndReached={() => {
        if (hasMore && !isFetchingMore) {
          onLoadMore();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        hasMore ? (
          <View style={styles.footer}>
            {isFetchingMore && <ActivityIndicator />}
          </View>
        ) : profiles.length > 0 ? (
          <Text style={styles.footerText}>No more profiles to load</Text>
        ) : null
      }
      ListEmptyComponent={() =>
        !loading ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No profiles found</Text>
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  footer: {
    paddingVertical: 20,
  },
  footerText: {
    textAlign: "center",
    color: "#888",
    padding: 16,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
