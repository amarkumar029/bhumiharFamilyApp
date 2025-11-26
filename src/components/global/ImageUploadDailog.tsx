import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { launchImageLibrary, Asset } from "react-native-image-picker";
import { Upload } from "lucide-react-native"; // or any icon library

interface Props {
  onImageSelect: (file: Asset) => void;
}

export const ImageUploadDialog: React.FC<Props> = ({ onImageSelect }) => {
  const handleSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      onImageSelect(result.assets[0]);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSelectImage}>
      <View style={styles.iconWrapper}>
        <Upload size={24} color="#2563EB" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Add photos</Text>
        <Text style={styles.subtitle}>Tap to select from gallery</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    backgroundColor: "rgba(59,130,246,0.1)", // primary/10
    padding: 16,
    borderRadius: 999,
    marginBottom: 16,
  },
  textWrapper: {
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280", // gray-500
  },
});