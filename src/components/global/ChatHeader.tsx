import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native"; // RN-compatible icons
import ProfileImage from "./ProfileImage";

interface ChatHeaderProps {
  user: {
    id: string;
    image?: string | null;
    fullName: string;
  } | null;
  isLoading: boolean;
  onBackPress?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user, isLoading, onBackPress }) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingWrapper}>
          <View style={styles.loadingAvatar} />
          <View style={styles.loadingText} />
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <ArrowLeft size={20} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.placeholderText}>Select a conversation</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <ArrowLeft size={20} color="#6B7280" />
      </TouchableOpacity>
      <View style={styles.userWrapper}>
        <ProfileImage fullName={user.fullName} image={user.image} showAction={true} />
        <Text style={styles.userName}>{user.fullName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  loadingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  loadingAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  loadingText: {
    width: 96,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  backButton: {
    marginRight: 8,
  },
  placeholderText: {
    color: "#6B7280",
    fontSize: 16,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
  },
});

export default ChatHeader;