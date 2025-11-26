import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react-native";

import ProfileImage from "../global/ProfileImage";
// import { useGetRecentMessages } from "@/lib/react-query/queries";
import { useGetRecentMessages } from "../../lib/react-query/queries";

export default function RecentChats() {
  const navigation = useNavigation();
  const { data: messages, isLoading } = useGetRecentMessages();

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <MessageSquare size={20} color="#3b82f6" />
        <Text style={styles.headerText}>Recent Chats</Text>
      </View>

      {/* Content Area */}
      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={{ paddingVertical: 10 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <View key={index} style={styles.skeletonRow}>
                <View style={styles.skeletonAvatar} />
                <View style={styles.skeletonTextArea}>
                  <View style={styles.skeletonLineShort} />
                  <View style={styles.skeletonLineFull} />
                </View>
              </View>
            ))}
          </View>
        ) : !messages || messages.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No recent chats found</Text>
          </View>
        ) : (
          messages.map((chat) => (
            <TouchableOpacity
              key={chat.chatId}
              style={styles.chatItem}
              onPress={() => navigation.navigate("ChatScreen", { id: chat.chatId })}
            >
              <ProfileImage
                fullName={chat.otherUser.fullName}
                image={chat.otherUser.image}
                size="md"
              />

              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName} numberOfLines={1}>
                    {chat.otherUser.fullName}
                  </Text>

                  <Text style={styles.timeText}>
                    {formatDistanceToNow(new Date(chat.lastMessageTime || ""), {
                      addSuffix: true,
                    })}
                  </Text>
                </View>

                <Text numberOfLines={1} style={styles.lastMessage}>
                  {chat.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
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
    paddingBottom: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    minHeight: 300,
  },

  header: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  content: {
    padding: 12,
  },

  empty: {
    alignItems: "center",
    paddingVertical: 30,
  },

  emptyText: {
    color: "#6b7280",
    fontSize: 14,
  },

  chatItem: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  chatInfo: {
    flex: 1,
    marginLeft: 10,
  },

  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  chatName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },

  timeText: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 6,
  },

  lastMessage: {
    marginTop: 2,
    fontSize: 13,
    color: "#4b5563",
  },

  // Skeleton Loader
  skeletonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
  },

  skeletonTextArea: {
    flex: 1,
    marginLeft: 10,
  },

  skeletonLineShort: {
    width: "40%",
    height: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginBottom: 6,
  },

  skeletonLineFull: {
    width: "100%",
    height: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
  },
});