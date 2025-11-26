import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "../../lib/axios";
import { API_BASE_URL } from "../../constants";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  maxImages?: number;
}

export default function MatrimonialImagesUpload({
  value = [],
  onChange,
  maxImages = 6,
}: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const pickImages = async () => {
    if (value.length >= maxImages) {
      Alert.alert("Limit reached", `You can upload only ${maxImages} images`);
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow photo access to upload images");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: maxImages - value.length,
    });

    if (!result.canceled) {
      uploadImages(result.assets);
    }
  };

  const uploadImages = async (files: ImagePicker.ImagePickerAsset[]) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("matrimonialImages", {
          uri: file.uri,
          name: `image-${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);
      });

      const response = await axios.put(
        `${API_BASE_URL}/user/matrimonial-images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.success) {
        onChange(response.data.data);
        Alert.alert("Success", "Images uploaded successfully");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      Alert.alert("Upload Failed", "Unable to upload images");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <View>
      {value.length < maxImages && (
        <TouchableOpacity style={styles.uploadBox} onPress={pickImages}>
          {isUploading ? (
            <ActivityIndicator />
          ) : (
            <>
              <MaterialIcons name="file-upload" size={32} color="#666" />
              <Text style={styles.uploadText}>
                Upload Images ({value.length}/{maxImages})
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}

      <View style={styles.grid}>
        {value.map((image, index) => (
          <View key={`${image}-${index}`} style={styles.imageBox}>
            <TouchableOpacity onPress={() => setPreviewImage(image)}>
              <Image
                source={{ uri: `${API_BASE_URL}/${image}` }}
                style={styles.image}
              />
            </TouchableOpacity>

            {!isUploading && (
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeImage(index)}>
                <MaterialIcons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {/* Image Preview Modal */}
      <Modal visible={!!previewImage} transparent animationType="fade">
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setPreviewImage(null)}>
            <MaterialIcons name="close" size={28} color="white" />
          </TouchableOpacity>

          {previewImage && (
            <Image
              source={{ uri: `${API_BASE_URL}/${previewImage}` }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  uploadText: {
    color: "#666",
    marginTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  imageBox: {
    width: "30%",
    aspectRatio: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removeBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "red",
    borderRadius: 12,
    padding: 4,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "80%",
  },
  modalClose: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});