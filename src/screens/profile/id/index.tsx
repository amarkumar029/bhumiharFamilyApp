import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useGetUserProfile } from "../../../lib/react-query/queries";
import ProfileSkeleton from "../../../components/custom/ProfileSkeleton";
import ErrorDisplay from "../../../components/custom/ErrorDisplay";
import ProfileDetails from "../../../components/custom/ProfileDetails";
import type { ApiError, UserProfile } from "../../../types";

type RouteParams = {
  id?: string;
};

const ProfilePage: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { id } = (route.params as RouteParams) || {};

  /* ✅ Missing ID */
  if (!id) {
    return (
      <ErrorDisplay
        error={{
          success: false,
          message: "Missing profile ID",
          statusCode: 400,
        }}
        onRetry={() => navigation.navigate("Home")}
      />
    );
  }

  /* ✅ Fetch profile */
  const {
    data,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetUserProfile(id);

  /* ✅ Loading */
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ProfileSkeleton />
      </View>
    );
  }

  /* ✅ Error */
  if (
    isError ||
    !data ||
    ("success" in data && data.success === false)
  ) {
    const apiError =
      (error as ApiError) || (data as ApiError);

    return (
      <View style={styles.container}>
        <ErrorDisplay error={apiError} onRetry={refetch} />
      </View>
    );
  }

  /* ✅ Success */
  const profileData = data as UserProfile;

  return (
    <ScrollView style={styles.container}>
      <ProfileDetails profile={profileData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
  },
});

export default ProfilePage;