import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MessageInput from "./MessageInput";
import { useSendMessage } from "../../lib/react-query/mutation";

interface CreateChatProps {
  receiverId: string;
  receiverName: string;
}

export default function CreateChat({ receiverId, receiverName }: CreateChatProps) {
  const navigation = useNavigation();
  const [showInput, setShowInput] = useState(false);
  const { mutate: sendMessage, isPending } = useSendMessage();

  const handleStartChat = () => {
    setShowInput(true);
  };

  const handleSendMessage = (content: string) => {
    sendMessage(
      { receiverId, content },
      {
        onSuccess: (response: any) => {
          if (response?.data?.chatId) {
            navigation.navigate("ChatScreen", { chatId: response.data.chatId });
          }
        },
      }
    );
  };

  return (
    <View style={{ marginTop: 16 }}>
      {!showInput ? (
        <TouchableOpacity style={styles.button} onPress={handleStartChat}>
          <Text style={styles.buttonText}>Start Conversation with {receiverName}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>New message to {receiverName}</Text>
          </View>
          <MessageInput onSendMessage={handleSendMessage} isLoading={isPending} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  chatContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    overflow: "hidden",
  },
  chatHeader: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  chatTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
});