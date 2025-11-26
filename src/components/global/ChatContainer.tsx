import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";

import ChatHeader from "./ChatHeader";
import MessageListItem from "./MessageListItem";
import MessageInput from "./MessageInput";
import { useGetInfiniteMessages } from "../../lib/react-query/queries";
import { useSendMessage } from "../../lib/react-query/mutation";
import { chatApi } from "../../lib/api/chat";
import { QUERY_KEY } from "../../lib/react-query/queryKey";
import { IChatMessages } from "../../types/chat";

interface ChatContainerProps {
  currentUserId: string;
}

export default function ChatContainer({ currentUserId }: ChatContainerProps) {
  const route = useRoute<any>();
  const chatId = route.params?.id as string | undefined;

  const queryClient = useQueryClient();
  const [receiver, setReceiver] = useState<{
    id: string;
    fullName: string;
    image: string | null;
  } | null>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useGetInfiniteMessages(chatId || "");

  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  const messages = data?.pages.flatMap((page) => page?.rows) || [];

  useEffect(() => {
    refetch();
  }, [chatId]);

  useEffect(() => {
    async function getReceiver() {
      if (chatId) {
        try {
          const data = await chatApi.getParticipant({ chatId });
          setReceiver(data);
        } catch (error) {
          setReceiver(null);
        }
      }
    }
    getReceiver();
  }, [chatId]);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!receiver) return;

      const optimisticMessage: IChatMessages = {
        id: `temp-${Date.now()}`,
        content,
        isRead: false,
        createdAt: new Date().toISOString(),
        senderId: currentUserId,
        receiverId: receiver.id,
        chatId: chatId || "",
        sender: {
          id: currentUserId,
          fullName: "Current User",
          image: null,
        },
        receiver: {
          id: receiver.id,
          fullName: receiver.fullName,
          image: receiver.image,
        },
      };

      // Optimistically update cache
      queryClient.setQueryData(
        [QUERY_KEY.GET_CHAT_MESSAGES, chatId],
        (oldData: any) => {
          if (!oldData)
            return { pages: [{ rows: [optimisticMessage], total: 1 }], pageParams: [1] };

          return {
            ...oldData,
            pages: oldData.pages.map((page: any, index: number) => {
              if (index === 0) {
                return {
                  ...page,
                  rows: [...page.rows, optimisticMessage],
                  total: page.total + 1,
                };
              }
              return page;
            }),
          };
        }
      );

      // Send actual message
      sendMessage(
        { receiverId: receiver.id, content },
        {
          onSuccess: () => refetch(),
          onError: () => {
            queryClient.setQueryData(
              [QUERY_KEY.GET_CHAT_MESSAGES, chatId],
              (oldData: any) => {
                if (!oldData) return { pages: [], pageParams: [] };
                return {
                  ...oldData,
                  pages: oldData.pages.map((page: any) => ({
                    ...page,
                    rows: page.rows.filter((msg: IChatMessages) => msg.id !== optimisticMessage.id),
                    total: page.total - 1,
                  })),
                };
              }
            );
          },
        }
      );
    },
    [receiver, currentUserId, chatId, queryClient, sendMessage, refetch]
  );

  if (!chatId) {
    return (
      <View style={styles.container}>
        <ChatHeader user={null} isLoading={false} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Select a conversation to start chatting</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChatHeader user={receiver} isLoading={isLoading && !receiver} />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageListItem message={item} currentUserId={currentUserId} />
        )}
        inverted
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.1}
      />

      <MessageInput onSendMessage={handleSendMessage} isLoading={isSending} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
});
