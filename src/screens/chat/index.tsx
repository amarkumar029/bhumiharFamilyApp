import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

import ActiveChats from "../../components/global/ActiveChats";
import { useGetActiveChats } from "../../lib/react-query/queries";
import { RootState } from "../../store";

const ChatContainer = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { data, isLoading } = useGetActiveChats();
  const { user } = useSelector((state: RootState) => state.auth);

  const chatId = route.params?.id;

  useEffect(() => {
    if (!chatId && data?.data?.length > 0 && !isLoading) {
      navigation.replace("ChatRoom", {
        id: data.data[0].chatId,
        currentUserId: user?.id,
      });
    }
  }, [chatId, data, isLoading, navigation, user]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading chats...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActiveChats
        data={data?.data || []}
        onSelect={(chatId: string) =>
          navigation.navigate("ChatRoom", {
            id: chatId,
            currentUserId: user?.id,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#6b7280",
  },
});

export default ChatContainer;