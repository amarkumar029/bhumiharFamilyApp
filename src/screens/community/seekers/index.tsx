import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { List, Filter } from "lucide-react-native";
import { useSelector } from "react-redux";

import { useCommunityUsers } from "../../../hooks/useCommunity";
import { FilterSection } from "../../../components/global/FilterSection";
import { UserInfo } from "../../../components/global/UserInfo";
import { RootState } from "../../../store";

type RouteParams = {
  Community: {
    type?: "helpers" | "seekers";
  };
};

const CommunityScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, "Community">>();
  const navigation = useNavigation<any>();

  const type = route.params?.type ?? "seekers";

  const { users, loading, hasMore, loadMore } = useCommunityUsers(type);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const checkoutList = useSelector(
    (state: RootState) => state.user.checkoutList
  );
  const { notInterestedIds } = useSelector((state: RootState) => state.user);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {type === "helpers" ? "Find Help" : "Offer Help"}
        </Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => setIsFilterOpen(true)}>
            <Filter size={18} color="#111" />
            <Text style={styles.btnText}>Filters</Text>
          </TouchableOpacity>

          {!!checkoutList.length && (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.navigate("Checkout")}>
              <List size={18} color="#fff" />
              <Text style={styles.primaryBtnText}>Check List</Text>
            </TouchableOpacity>
          )}

          {!!notInterestedIds.length && (
            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={() => navigation.navigate("NotInterested")}>
              <List size={18} color="#111" />
              <Text style={styles.btnText}>Not Interested</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Users List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <UserInfo user={item} index={index} type={type} />
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              style={{ marginVertical: 24 }}
              size="large"
              color="#2563eb"
            />
          ) : null
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>No users found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your filters or check back later
              </Text>
            </View>
          ) : null
        }
      />

      {/* Filter Modal */}
      <Modal visible={isFilterOpen} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <FilterSection type={type} />
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setIsFilterOpen(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  outlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#2563eb",
  },
  btnText: {
    fontSize: 14,
    color: "#111",
  },
  primaryBtnText: {
    fontSize: 14,
    color: "#fff",
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  columnWrapper: {
    gap: 12,
  },
  card: {
    flex: 1,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
  },
  empty: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6b7280",
  },
  emptyText: {
    marginTop: 4,
    color: "#9ca3af",
  },
  modal: {
    flex: 1,
    padding: 16,
  },
  closeBtn: {
    alignSelf: "center",
    marginTop: 20,
  },
  closeText: {
    fontSize: 16,
    color: "#2563eb",
  },
});

export default CommunityScreen;