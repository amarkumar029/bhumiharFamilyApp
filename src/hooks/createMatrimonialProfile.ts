import { api } from "../lib/axios";
import { updateCredential } from "../store/slices/authSlice";
import { MatrimonialFormData } from "@/validation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const createMatrimonialProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  async function createProfile(data: MatrimonialFormData) {
    setLoading(true);
    try {
      const result = await api.put("/matrimonial/profile", {
        ...data,
        isMatrimonialProfile: true,
      });

      if (result.data.success) {
        dispatch(updateCredential({ isMatrimonialProfile: true }));

        // Navigate in React Native
        navigation.navigate("Matrimonial");

        Alert.alert("Profile Created", "Matrimonial Profile Created");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message;
      setError(message);

      Alert.alert("Profile Creation Failed", message || "Error creating profile!");
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    createProfile,
    error,
  };
};
