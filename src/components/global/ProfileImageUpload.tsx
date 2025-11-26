import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";

import { api } from "../../lib/axios";
import { API_BASE_URL } from "../../constants";
import { updateCredential } from "../../store/slices/authSlice";
import { toast } from "../../hooks/toast";

interface ProfileImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  style?: any;
}

export function ProfileImageUpload({
  value,
  onChange,
  style,
}: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 1,
        quality: 0.8,
        includeBase64: false,
      },
      async (response) => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          Alert.alert("Error", response.errorMessage);
          return;
        }
        if (response.assets && response.assets[0]) {
          uploadImage(response.assets[0]);
        }
      }
    );
  };

  const uploadImage = async (asset: any) => {
    try {
      setIsUploading(true);
      const formData = new FormData();

      formData.append("image", {
        uri: asset.uri,
        name: asset.fileName || "profile.jpg",
        type: asset.type || "image/jpeg",
      } as any);

      formData.append("type", "profile");

      const response = await api.put("/user/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.success) {
        onChange(response.data.data);
        dispatch(updateCredential({ image: response.data.data }));

        toast({
          title: "Image uploaded",
          description: "Profile image updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload profile picture",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    onChange("");
  };

  return (
    <View style={[styles.container, style]}>
      {!value ? (
        <TouchableOpacity
          style={[styles.uploadBox, isUploading && styles.disabled]}
          onPress={pickImage}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator size="large" color="#3b82f6" />
          ) : (
            <>
              <Icon name="cloud-upload-outline" size={28} color="#6b7280" />
              <Text style={styles.uploadText}>Upload photo</Text>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.previewWrapper}>
          <Image
            source={{
              uri: `${API_BASE_URL}/${value.replace(/\\/g, "/")}`,
            }}
            style={styles.image}
          />
          {!isUploading && (
            <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
              <Icon name="close" size={14} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: "center",
  },

  uploadBox: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },

  disabled: {
    opacity: 0.6,
  },

  uploadText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 6,
  },

  previewWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: "hidden",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  removeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#ef4444",
    borderRadius: 12,
    padding: 4,
  },
});
