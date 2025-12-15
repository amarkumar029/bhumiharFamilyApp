import React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

import ChatContainer from "../../../components/global/ChatContainer";
import { RootState } from "../../../store";

type RouteParams = {
  id?: string;
};

const UserInboxScreen: React.FC = () => {
  const route = useRoute<any>();
  const { user } = useSelector((state: RootState) => state.auth);

  const chatUserId = route.params?.id;

  if (!chatUserId || !user?.id) return null;

  return (
    <View style={{ flex: 1 }}>
      <ChatContainer currentUserId={user.id} />
    </View>
  );
};

export default UserInboxScreen;