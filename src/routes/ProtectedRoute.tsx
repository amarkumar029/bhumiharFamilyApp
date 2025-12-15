import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { RootStackParamList } from "../navigation/AppNavigator";

interface ProtectedRouteProps {
  children: React.ReactNode;
  protectMatrimonial?: boolean;
}

export default function ProtectedRoute({
  children,
  protectMatrimonial = false,
}: ProtectedRouteProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Not logged in
    if (!isAuthenticated) {
      navigation.replace("Login");
      return;
    }

    // Onboarding not completed
    if (!user?.onBoardingCompleted) {
      navigation.replace("Onboarding");
      return;
    }

    // Accessing matrimonial but user has no profile
    if (protectMatrimonial && !user?.isMatrimonialProfile) {
      navigation.replace("MatrimonialCheck");
      return;
    }
  }, [isAuthenticated, isLoading, user]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f3f4f6",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#ff5c00" />
      </View>
    );
  }

  return <>{children}</>;
}