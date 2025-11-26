import React from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProfileImage from "./ProfileImage"; // Your RN component for profile image
import { IActiveChat } from "../../types/chat";
import { formatTimeAgo } from "../../utils";

type Props = {
  data: IActiveChat[];
};

export default function ActiveChats({ data }: Props) {
  const navigation = useNavigation();
  const route = useRoute();
  const currentChatId = route.params?.id;

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No active chats 💬</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: IActiveChat }) => {
    const isActive = currentChatId === item.chatId;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen", { chatId: item.chatId })}
        style={[styles.chatItem, isActive && styles.activeChatItem]}
      >
        <ProfileImage fullName={item.user.fullName} image={item.user.image} />
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.userName} numberOfLines={1}>
              {item.user.fullName}
            </Text>
            <Text style={styles.timeText}>{formatTimeAgo(item.lastMessageTime)}</Text>
          </View>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.chatId}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 18,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    color: "#6b7280", // gray-500
    fontSize: 16,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  activeChatItem: {
    backgroundColor: "#eff6ff", // bg-blue-50
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827", // gray-900
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: "#6b7280", // gray-500
  },
  lastMessage: {
    fontSize: 12,
    color: "#6b7280", // gray-500
    marginTop: 2,
  },
});
