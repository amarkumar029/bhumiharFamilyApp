import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation, NavigationProp, useRoute } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { RootStackParamList } from "../navigation/AppNavigator";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();

  const { isAuthenticated, user, isLoading } = useAuth();

  // When the user was redirected previously, the screen may send "from" param
  const from = (route.params as any)?.from || "HomeRoutes";

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      // If onboarding NOT completed → send user to Onboarding
      if (!user?.profile?.onboardingCompleted) {
        navigation.replace("Onboarding");
        return;
      }

      // Otherwise redirect to "from" or Home
      navigation.replace(from);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3f4f6",
        }}
      >
        <ActivityIndicator size="large" color="#ff5c00" />
      </View>
    );
  }

  // User is NOT authenticated → allow access
  return <>{children}</>;
}