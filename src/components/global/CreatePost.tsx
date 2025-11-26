import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProfileImage from "./ProfileImage";
import { PostFormPanel } from "./PostFormPanel";

interface Props {
  fullName: string;
  imageUrl?: string;
}

export function CreatePost({ fullName, imageUrl }: Props) {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <ProfileImage fullName={fullName} image={imageUrl} size={40} />
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => setIsOpen(true)}
          >
            <Text style={styles.inputText} numberOfLines={1}>
              What's on your mind, {fullName.split(" ")[0]}?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <PostFormPanel
        fullName={fullName}
        imageUrl={imageUrl}
        isOpen={open}
        onClose={() => setIsOpen(false)}
        mode="create"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  inputText: {
    color: "#6B7280",
    fontSize: 14,
  },
});
