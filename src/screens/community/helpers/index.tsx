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

  const type = route.params?.type ?? "helpers";

  const { users, loading, hasMore, loadMore } = useCommunityUsers(type);
  const [filterVisible, setFilterVisible] = useState(false);

  const { checkoutList, notInterestedIds } = useSelector(
    (state: RootState) => state.user
  );

  const loadMoreUsers = useCallback(() => {
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

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFilterVisible(true)}>
            <Filter size={18} color="#111" />
            <Text style={styles.btnText}>Filters</Text>
          </TouchableOpacity>

          {!!checkoutList.length && (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.navigate("Checkout")}>
              <List size={18} color="#fff" />
              <Text style={styles.primaryBtnText}>Checklist</Text>
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

      {/* User List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <UserInfo user={item} index={index} type={type} />
          </View>
        )}
        contentContainerStyle={styles.list}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#2563eb" />
            </View>
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
      <Modal visible={filterVisible} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <FilterSection type={type} />
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setFilterVisible(false)}>
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
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterBtn: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  primaryBtn: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  outlineBtn: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
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
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
  },
  loader: {
    paddingVertical: 20,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 40,
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
    marginTop: 20,
    alignSelf: "center",
  },
  closeText: {
    color: "#2563eb",
    fontSize: 16,
  },
});

export default CommunityScreen;
