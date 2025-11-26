import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Home,
  LogOut,
  Settings,
  MessageSquare,
  Users,
  Heart,
  Search,
  LayoutDashboard,
  Share2,
  UserRound,
} from "lucide-react-native";
import ProfileImage from "./ProfileImage";
import { NAVIGATIONS } from "../../constants";
import { logout } from "../../store/slices/authSlice";
import type { RootState } from "../../store";
import { useNavigation } from "@react-navigation/native";

const getIconForItem = (path: string) => {
  const iconMap: Record<string, JSX.Element> = {
    "/": <Home size={20} />,
    "/posts": <Share2 size={20} />,
    "/community": <Users size={20} />,
    "/community/seekers": <UserRound size={20} />,
    "/community/helpers": <Users size={20} />,
    "/matrimonial": <Heart size={20} />,
    "/matrimonial/search": <Search size={20} />,
    "/chat": <MessageSquare size={20} />,
  };
  return iconMap[path] || <LayoutDashboard size={20} />;
};

const newItems = ["/posts", "/matrimonial/search"];

export function LeftSideBar() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.auth);

  const renderNavItem = (item: any) => {
    const isNew = newItems.includes(item.path);

    return (
      <TouchableOpacity
        key={item.item}
        style={styles.navItem}
        onPress={() => navigation.navigate(item.path as never)}
      >
        <View style={styles.navIcon}>{getIconForItem(item.path)}</View>
        <Text style={styles.navText}>{item.item}</Text>
        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>New</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSection = ({ item }: { item: any }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item.label}</Text>
      <FlatList
        data={item.children}
        renderItem={renderNavItem}
        keyExtractor={(child: any) => child.item}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Profile */}
      <TouchableOpacity
        style={styles.profileHeader}
        onPress={() => navigation.navigate("Profile" as never)}
      >
        <ProfileImage fullName={user?.fullName!} image={user?.image} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.profileName}>
            {user?.fullName?.split(" ")[0] || "Untitled"}
          </Text>
          <Text style={styles.profileSub}>View Profile</Text>
        </View>
      </TouchableOpacity>

      {/* Navigation Sections */}
      <ScrollView style={styles.navScroll}>
        <FlatList
          data={NAVIGATIONS}
          renderItem={renderSection}
          keyExtractor={(section) => section.label}
        />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("Profile" as never)}
        >
          <Settings size={20} />
          <Text style={styles.footerButtonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerButton, { borderColor: "#F87171" }]}
          onPress={() => dispatch(logout())}
        >
          <LogOut size={20} color="#EF4444" />
          <Text style={[styles.footerButtonText, { color: "#EF4444" }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 280,
    backgroundColor: "#F9FAFB",
    borderRightWidth: 1,
    borderRightColor: "#D1D5DB",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
  },
  profileName: { fontSize: 16, fontWeight: "500", color: "#111827" },
  profileSub: { fontSize: 12, color: "#6B7280" },
  navScroll: { flex: 1, paddingVertical: 8 },
  section: { marginBottom: 16, paddingHorizontal: 8 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  navIcon: { marginRight: 8 },
  navText: { flex: 1, fontSize: 14, color: "#374151" },
  newBadge: {
    backgroundColor: "#FED7AA",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  newBadgeText: { fontSize: 10, fontWeight: "500", color: "#C2410C" },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    padding: 12,
    backgroundColor: "#fff",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  footerButtonText: { fontSize: 14, marginLeft: 6, color: "#374151" },
});
