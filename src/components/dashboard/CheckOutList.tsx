import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { NotebookTabs, Send, X } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCheckoutList } from "../../store/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import communityApi from "../../lib/api/community";

import ProfileImage from "../../global/ProfileImage";
import { useUserActions } from "../../hooks/useUserAction";

export default function CheckOutList() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const checkoutList = useSelector(
    (state: RootState) => state.user.checkoutList
  );

  const { removeFromCheckoutList } = useUserActions();

  useEffect(() => {
    const fetchCheckoutList = async () => {
      try {
        const users = await communityApi.getCheckoutList();
        dispatch(setCheckoutList(users));
      } catch (error) {
        console.error("Error fetching checkout list:", error);
      }
    };

    fetchCheckoutList();
  }, []);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <NotebookTabs color="#3b82f6" size={20} />
        <Text style={styles.title}>Checkout List ({checkoutList.length})</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {checkoutList.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No users in checkout list</Text>
          </View>
        ) : (
          checkoutList.map((user) => (
            <View key={user.id} style={styles.userCard}>
              {/* User Profile Navigation */}
              <TouchableOpacity
                style={styles.userInfo}
                onPress={() =>
                  navigation.navigate("ProfilePage", { id: user.id })
                }
              >
                <ProfileImage
                  fullName={user.fullName}
                  image={user.image}
                  showAction
                  size="sm"
                />

                <View style={styles.userDetails}>
                  <Text style={styles.typeText}>
                    {user.checkOutType === "helpers"
                      ? "Ask help from"
                      : "Reach out to help"}
                  </Text>

                  <Text style={styles.nameText}>{user.fullName}</Text>
                </View>
              </TouchableOpacity>

              {/* Buttons */}
              <View style={styles.btnGroup}>
                {/* Message Button */}
                <TouchableOpacity
                  style={[styles.btn, styles.msgBtn]}
                  onPress={() =>
                    navigation.navigate("NewChat", {
                      id: user.id,
                      userName: user.fullName,
                    })
                  }
                >
                  <Send size={16} color="#fff" />
                  <Text style={styles.btnText}>Message</Text>
                </TouchableOpacity>

                {/* Remove Button */}
                <TouchableOpacity
                  style={[styles.btn, styles.removeBtn]}
                  onPress={() =>
                    removeFromCheckoutList(
                      user.id,
                      user._id,
                      user.checkOutType
                    )
                  }
                >
                  <X size={16} color="#fff" />
                  <Text style={styles.btnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    minHeight: 300,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  header: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
    color: "#111827",
  },

  content: {
    marginTop: 10,
  },

  center: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#6b7280",
  },

  userCard: {
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 10,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  userDetails: {
    marginLeft: 8,
    flex: 1,
  },

  typeText: {
    fontSize: 12,
    color: "#6b7280",
  },

  nameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  btnGroup: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
    gap: 10,
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  msgBtn: {
    backgroundColor: "#3b82f6",
  },

  removeBtn: {
    backgroundColor: "#ef4444",
  },

  btnText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "500",
  },
});