import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useGetProfileData } from "../../lib/react-query/queries";
import ProfileDetailsForm from "../../components/global/ProfileDetailsForm";
import CommunityDetailsForm from "../../components/global/CommunityDetailsForm";
import MatrimonialDetailsForm from "../../components/global/MatrimonialDetailsForm";

type RouteParams = {
  page?: "personaldetails" | "communitydetails" | "matrimonialdetails";
};

export default function Profile() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { page } = (route.params as RouteParams) || {};

  const [isNavigating, setIsNavigating] = useState(false);

  const { data, isFetching, error } = useGetProfileData();

  useEffect(() => {
    setIsNavigating(false);
  }, [page]);

  // Redirect to default tab
  useEffect(() => {
    if (!page) {
      navigation.replace("Profile", { page: "personaldetails" });
    }
  }, [page]);

  if (isFetching && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>Nothing found</Text>
      </View>
    );
  }

  const renderForm = () => {
    switch (page) {
      case "personaldetails":
        return <ProfileDetailsForm initialData={data.personalDetails} />;
      case "communitydetails":
        return <CommunityDetailsForm data={data.communityDetails} />;
      case "matrimonialdetails":
        return (
          <MatrimonialDetailsForm data={data.matrimonialDetails} />
        );
      default:
        return null;
    }
  };

  const NavButton = ({
    label,
    target,
  }: {
    label: string;
    target: ProfilePage;
  }) => {
    const active = page === target;

    return (
      <TouchableOpacity
        onPress={() => {
          setIsNavigating(true);
          navigation.navigate("Profile", { page: target });
        }}
        style={[
          styles.navButton,
          active && styles.navButtonActive,
        ]}
      >
        <Text
          style={[
            styles.navButtonText,
            active && styles.navButtonTextActive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>

          <View style={styles.nav}>
            <NavButton
              label="Personal Details"
              target="personaldetails"
            />
            <NavButton
              label="Community Details"
              target="communitydetails"
            />
            <NavButton
              label="Matrimonial Details"
              target="matrimonialdetails"
            />
          </View>
        </View>

        {/* Content */}
        {isNavigating ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>{renderForm()}</View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  inner: {
    padding: 16,
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  nav: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
  navButtonActive: {
    backgroundColor: "#2563EB",
  },
  navButtonText: {
    fontSize: 12,
    color: "#111827",
  },
  navButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loader: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
