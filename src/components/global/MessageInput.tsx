import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Send } from "lucide-react-native";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export default function MessageInput({
  onSendMessage,
  isLoading,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          editable={!isLoading}
          style={styles.input}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />

        <TouchableOpacity
          onPress={handleSend}
          disabled={!message.trim() || isLoading}
          style={[
            styles.sendButton,
            (!message.trim() || isLoading) && styles.disabled,
          ]}
        >
          <Send size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    minHeight: 40,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#ffffff",
  },
  sendButton: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
