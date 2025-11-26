import React, { useState, useEffect } from "react";
import { Modal, View, Image, StyleSheet, Pressable } from "react-native";
import { X } from "lucide-react-native"; // Make sure to install lucide-react-native or use any icon library

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()} style={styles.imageContainer}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={24} color="black" />
          </Pressable>
          <Image
            source={imageSrc ? { uri: imageSrc } : require("../assets/placeholder.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    maxWidth: "90%",
    maxHeight: "90%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: -20,
    right: -20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
