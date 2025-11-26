import React from "react";
import { View, TextInput, ActivityIndicator, Text } from "react-native";
import { useGetUsers } from "./useGetUsers";

export default function UserSearch() {
  const { setKeyword, data, isFetching, error } = useGetUsers();

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Search users..."
        onChangeText={setKeyword}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          marginBottom: 12
        }}
      />

      {isFetching && <ActivityIndicator />}

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      {data &&
        data.map(user => (
          <Text key={user.id} style={{ paddingVertical: 4 }}>
            {user.name}
          </Text>
        ))}
    </View>
  );
}
