import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useGetProfile } from "@/hooks/useGetProfile";

export default function ProfileScreen() {
  const { data, loading, error } = useGetProfile();

  if (loading) return <ActivityIndicator />;

  if (error) return <Text style={{ color: "red" }}>{error}</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Name: {data?.fullName}</Text>
      <Text>Email: {data?.email}</Text>
    </View>
  );
}
