import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { IChatMessages } from "../../types/chat";
import { formatMessageTime } from "../../utils";
import ProfileImage from "./ProfileImage";

interface MessageBubbleProps {
  message: IChatMessages;
  isCurrentUser: boolean;
}

export default function MessageBubble({
  message,
  isCurrentUser,
}: MessageBubbleProps) {
  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.alignRight : styles.alignLeft,
      ]}
    >
      <View
        style={[
          styles.row,
          isCurrentUser ? styles.rowReverse : styles.rowNormal,
        ]}
      >
        {/* Avatar */}
        {!isCurrentUser && (
          <View style={styles.avatar}>
            <ProfileImage
              fullName={message.sender.fullName}
              image={message.sender.image}
              size="sm"
            />
          </View>
        )}

        {/* Message */}
        <View style={styles.messageWrapper}>
          <View
            style={[
              styles.bubble,
              isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isCurrentUser && styles.currentUserText,
              ]}
            >
              {message.content}
            </Text>
          </View>

          {/* Time */}
          <Text
            style={[
              styles.timeText,
              isCurrentUser ? styles.timeRight : styles.timeLeft,
            ]}
          >
            {formatMessageTime(message.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: "100%",
  },
  alignRight: {
    alignItems: "flex-end",
  },
  alignLeft: {
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    maxWidth: "80%",
  },
  rowNormal: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  avatar: {
    marginRight: 8,
  },
  messageWrapper: {
    flexShrink: 1,
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  currentUserBubble: {
    backgroundColor: "#2563eb", // blue-600
    borderTopRightRadius: 2,
  },
  otherUserBubble: {
    backgroundColor: "#f3f4f6", // gray-100
    borderTopLeftRadius: 2,
  },
  messageText: {
    fontSize: 14,
    color: "#1f2937",
  },
  currentUserText: {
    color: "#ffffff",
  },
  timeText: {
    marginTop: 4,
    fontSize: 11,
    color: "#6b7280",
  },
  timeRight: {
    textAlign: "right",
  },
  timeLeft: {
    textAlign: "left",
  },
});
