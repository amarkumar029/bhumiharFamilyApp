import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { logout } from "../../store/slices/authSlice";
import { RootState } from "../../store";
import ProfileImage from "./ProfileImage";
import { NAVIGATIONS } from "../../constants";

const newItems = ["/posts", "/matrimonial/search"];

const getIcon = (path: string) => {
  const map: Record<string, string> = {
    "/": "home-outline",
    "/posts": "share-social-outline",
    "/community": "people-outline",
    "/community/seekers": "person-outline",
    "/community/helpers": "people-circle-outline",
    "/matrimonial": "heart-outline",
    "/matrimonial/search": "search-outline",
    "/chat": "chatbox-outline",
  };
  return map[path] || "grid-outline";
};

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.topbar}>
      <Text style={styles.title}>Bhumihar Family</Text>

      <TouchableOpacity onPress={() => setOpen(true)}>
        <Ionicons name="menu-outline" size={26} />
      </TouchableOpacity>

      {/* Drawer Modal */}
      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.drawer}>
            {/* Profile */}
            <TouchableOpacity
              style={styles.profile}
              onPress={() => {
                setOpen(false);
                navigation.navigate("Profile");
              }}
            >
              <ProfileImage
                fullName={user?.fullName || ""}
                image={user?.image}
              />
              <View>
                <Text style={styles.name}>
                  {user?.fullName?.split(" ")[0]}
                </Text>
                <Text style={styles.subtext}>View Profile</Text>
              </View>
            </TouchableOpacity>

            {/* Navigation */}
            <ScrollView style={{ flex: 1 }}>
              {NAVIGATIONS.map((section) => (
                <View key={section.label}>
                  <Text style={styles.sectionLabel}>
                    {section.label}
                  </Text>

                  {section.children.map((item) => {
                    const isActive = route.name === item.path;
                    const isNew = newItems.includes(item.path);

                    return (
                      <TouchableOpacity
                        key={item.path}
                        style={[
                          styles.navItem,
                          isActive && styles.activeNav,
                        ]}
                        onPress={() => {
                          setOpen(false);
                          navigation.navigate(item.path);
                        }}
                      >
                        <Ionicons
                          name={getIcon(item.path)}
                          size={18}
                        />
                        <Text style={styles.navText}>
                          {item.item}
                        </Text>

                        {isNew && (
                          <View style={styles.newBadge}>
                            <Text style={styles.newText}>NEW</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => {
                  setOpen(false);
                  navigation.navigate("Settings");
                }}
              >
                <Ionicons name="settings-outline" size={18} />
                <Text>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.footerBtn, styles.logout]}
                onPress={() => dispatch(logout())}
              >
                <Ionicons name="log-out-outline" size={18} />
                <Text style={{ color: "#fff" }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    height: 56,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row-reverse",
  },
  drawer: {
    width: 300,
    backgroundColor: "#fff",
    padding: 16,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: {
    fontWeight: "600",
  },
  subtext: {
    fontSize: 12,
    color: "#666",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#777",
    marginVertical: 8,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  activeNav: {
    backgroundColor: "#DBEAFE",
  },
  navText: {
    flex: 1,
  },
  newBadge: {
    backgroundColor: "#FED7AA",
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  newText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#C2410C",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 12,
  },
  footerBtn: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingVertical: 10,
  },
  logout: {
    backgroundColor: "#DC2626",
    borderRadius: 6,
    paddingHorizontal: 12,
  },
});
