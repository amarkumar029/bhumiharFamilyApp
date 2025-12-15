import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import ChatHeader from "../../../components/global/ChatHeader";
import MessageInput from "../../../components/global/MessageInput";
import { useSendMessage } from "../../../lib/react-query/mutation";

type RouteParams = {
  id?: string;
  userName?: string;
};

const NewChatScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const receiverId = route.params?.id;
  const receiverName = route.params?.userName || "User";

  const { mutate: sendMessage, isPending } = useSendMessage();

  const [receiver] = useState({
    id: receiverId ?? "",
    fullName: receiverName,
    image: null,
  });

  useEffect(() => {
    if (!receiverId) {
      navigation.replace("ChatList");
    }
  }, [navigation, receiverId]);

  const handleSendMessage = (content: string) => {
    sendMessage(
      { receiverId, content },
      {
        onSuccess: (response) => {
          if (response?.data?.chatId) {
            navigation.replace("ChatRoom", {
              id: response.data.chatId,
            });
          }
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ChatHeader user={receiver} isLoading={false} />

      <View style={styles.emptyState}>
        <Text style={styles.text}>
          Start a new conversation with {receiverName}
        </Text>
      </View>

      <MessageInput onSendMessage={handleSendMessage} isLoading={isPending} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});

export default NewChatScreen;