import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProfileImage from "./ProfileImage";
import { useUserActions } from "../../hooks/useUserAction";
import type { IUsers } from "../../types";

interface Props {
  user: IUsers;
  index: number;
  type: "seekers" | "helpers";
  navigation: any;
}

export const UserInfo: React.FC<Props> = ({ user, index, type, navigation }) => {
  const location = JSON.parse(user.currentLocation || "{}");
  const [menuVisible, setMenuVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const { addToCheckoutList, markAsNotInterested } = useUserActions();

  const { checkoutList, notInterestedIds, keywords } = useSelector(
    (state: RootState) => state.user
  );

  const checkoutKey = type === "helpers" ? "canSeekHelp" : "canHelpOut";
  const selectedKeywords = keywords[checkoutKey];

  const isInCheckout = checkoutList.some(
    (i) => i.id === user.id && i.checkOutType === type
  );

  const isNotInterested = notInterestedIds.includes(user.id);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      {/* Header */}
      <View style={styles.header}>
        <ProfileImage fullName={user.fullName} image={user.image} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <Pressable onPress={() => setMenuVisible(true)}>
          <Icon name="more-vertical" size={18} />
        </Pressable>
      </View>

      {/* Bio */}
      <Text style={styles.bio}>{user.bioData}</Text>

      {/* Keywords */}
      <View style={styles.badgeContainer}>
        {selectedKeywords.map((keyword: string) =>
          JSON.parse(
            type === "seekers" ? user.canSeekHelp || "[]" : user.canHelpOut || "[]"
          ).includes(keyword) ? (
            <Text key={keyword} style={styles.badge}>
              {keyword}
            </Text>
          ) : null
        )}
      </View>

      {/* Location */}
      <InfoRow icon="map-pin" text={`${location.city}, ${location.state}`} />

      {!!user.profession && (
        <InfoRow icon="briefcase" text={user.profession} />
      )}

      {!!user.educationDegree && (
        <InfoRow
          icon="book"
          text={`${user.educationDegree} in ${user.specializedDegree}`}
        />
      )}

      {/* Modal Menu */}
      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menu}>
            <MenuItem
              label="Interested"
              icon="plus"
              disabled={isInCheckout}
              onPress={() => addToCheckoutList({ ...user, checkOutType: type })}
            />

            <MenuItem
              label="Not Interested"
              icon="x"
              danger
              disabled={isNotInterested}
              onPress={() => markAsNotInterested(user.id, type)}
            />

            <MenuItem
              label="View Profile"
              icon="user"
              onPress={() => navigation.navigate("Profile", { id: user.id })}
            />
          </View>
        </Pressable>
      </Modal>
    </Animated.View>
  );
};

/* ---------- Small Components ---------- */

const InfoRow = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={14} color="#6b7280" />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const MenuItem = ({
  label,
  icon,
  onPress,
  disabled,
  danger,
}: any) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={[styles.menuItem, danger && { backgroundColor: "#fee2e2" }]}
  >
    <Icon name={icon} size={14} color={danger ? "#dc2626" : "#111"} />
    <Text style={[styles.menuText, danger && { color: "#dc2626" }]}>
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  name: { fontSize: 16, fontWeight: "600" },
  email: { fontSize: 12, color: "#6b7280" },

  bio: { marginVertical: 8, color: "#374151" },

  badgeContainer: { flexDirection: "row", flexWrap: "wrap", gap: 6 },

  badge: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },

  infoText: { fontSize: 12, color: "#4b5563" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  menu: {
    backgroundColor: "#fff",
    width: 220,
    borderRadius: 10,
    padding: 6,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },

  menuText: {
    fontSize: 14,
  },
});
