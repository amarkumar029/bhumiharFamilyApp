// CheckOutList.tsx (React Native)
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCheckoutList } from "../../store/slices/userSlice";
import communityApi from "../../lib/api/community";
import ProfileImage from "../global/ProfileImage";
import { useUserAction } from "../../hooks/useUserAction";
import { useNavigation } from "@react-navigation/native";

export default function CheckOutList() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { removeFromCheckoutList } = useUserAction();

  const checkoutList = useSelector(
    (state: RootState) => state.user.checkoutList
  );

  useEffect(() => {
    const fetchCheckoutList = async () => {
      try {
        const users = await communityApi.getCheckoutList();
        dispatch(setCheckoutList(users));
      } catch (error) {
        console.log("Checkout list error:", error);
      }
    };
    fetchCheckoutList();
  }, [dispatch]);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="list-outline" size={18} color="#2563eb" />
        <Text style={styles.title}>
          Checkout List ({checkoutList.length})
        </Text>
      </View>

      {/* Content */}
      {checkoutList.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            No users in checkout list
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.list}>
          {checkoutList.map((user: any) => (
            <View key={user.id} style={styles.item}>
              {/* Profile */}
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
                    {user.checkOutType === "helpers"
                      ? "Ask help from"
                      : "Reach out to help"}
                  </Text>
                  <Text style={styles.name}>
                    {user.fullName}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.messageBtn}
                  onPress={() =>
                    navigation.navigate("NewChat", {
                      userId: user.id,
                      userName: user.fullName,
                    })
                  }
                >
                  <Ionicons
                    name="send-outline"
                    size={14}
                    color="#fff"
                  />
                  <Text style={styles.btnText}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() =>
                    removeFromCheckoutList(
                      user.id,
                      user._id,
                      user.checkOutType
                    )
                  }
                >
                  <Ionicons
                    name="close-outline"
                    size={14}
                    color="#fff"
                  />
                  <Text style={styles.btnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
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
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 12,
    color: "#6b7280",
  },
  list: {
    padding: 10,
  },
  item: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  messageBtn: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  removeBtn: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: "#dc2626",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
});
