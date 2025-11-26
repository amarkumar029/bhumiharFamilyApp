import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Check, Clock, MapPin, MessageCircle, X } from "lucide-react-native";
import ProfileImage from "./ProfileImage";
import { StatusBadge } from "./StatusBadge";

interface Location {
  state: string;
  city: string;
  mohalla?: string;
}

interface Sender {
  id: string;
  fullName: string;
  image: string | null;
  profession: string;
  currentLocation: string;
}

interface InterestProps {
  createdAt: string;
  id: string;
  message: string | null;
  receiverId: string;
  sender: Sender;
  senderId: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  updatedAt: string;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  isPending: boolean;
  navigation: any; // React Navigation prop
}

export const MatrimonialInterestCard: React.FC<InterestProps> = ({
  createdAt,
  id,
  message,
  sender,
  status,
  onAccept,
  onReject,
  isPending,
  navigation,
}) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    onAccept(id);
    setIsAccepted(true);
  };

  let location: Location = { state: "", city: "" };
  try {
    if (typeof sender.currentLocation === "string") {
      location = JSON.parse(sender.currentLocation);
      if (typeof location === "string") {
        location = JSON.parse(location);
      }
    }
  } catch (error) {
    console.error("Failed to parse location:", error);
  }

  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <ProfileImage fullName={sender.fullName} image={sender.image} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{sender.fullName}</Text>
            <Text style={styles.profession}>{sender.profession}</Text>
          </View>
        </View>
        <StatusBadge status={status} />
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <MapPin size={16} color="#6B7280" style={{ marginRight: 4 }} />
          <Text style={styles.text}>
            {location.city}, {location.state}
            {location.mohalla ? ` (${location.mohalla})` : ""}
          </Text>
        </View>

        <View style={styles.row}>
          <Clock size={16} color="#6B7280" style={{ marginRight: 4 }} />
          <Text style={styles.text}>Sent {formattedDate}</Text>
        </View>

        {message && (
          <View style={styles.messageBox}>
            <Text>{message}</Text>
          </View>
        )}

        {status === "ACCEPTED" && (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() =>
              navigation.navigate("Chat", {
                receiverId: sender.id,
                userName: sender.fullName,
              })
            }
          >
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        )}
      </View>

      {status === "PENDING" && (
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={isPending}
            style={styles.outlineButton}
            onPress={() => onReject(id)}
          >
            <X size={16} color="#EF4444" />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={isPending}
            style={styles.acceptButton}
            onPress={handleAccept}
          >
            <Check size={16} color="#fff" style={{ marginRight: 4 }} />
            <Text style={{ color: "#fff" }}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={isAccepted} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Start conversation with {sender.fullName}
            </Text>
            <View style={styles.profileRow}>
              <ProfileImage fullName={sender.fullName} image={sender.image} />
              <Text style={{ marginLeft: 12 }}>{sender.fullName}</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.outlineButton}
                onPress={() => setIsAccepted(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => {
                  setIsAccepted(false);
                  navigation.navigate("Chat", {
                    receiverId: sender.id,
                    userName: sender.fullName,
                  });
                }}
              >
                <MessageCircle size={16} color="#fff" style={{ marginRight: 4 }} />
                <Text style={{ color: "#fff" }}>Start Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginVertical: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  profileRow: { flexDirection: "row", alignItems: "center" },
  name: { fontWeight: "600", fontSize: 16 },
  profession: { fontSize: 12, color: "#6B7280" },
  content: { padding: 12 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  text: { fontSize: 14, color: "#374151" },
  messageBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  chatButton: {
    marginTop: 12,
    backgroundColor: "#3B82F6",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  chatButtonText: { color: "#fff", fontWeight: "600" },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  outlineButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  acceptButton: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#10B981",
    borderRadius: 8,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontWeight: "600", fontSize: 16, marginBottom: 12 },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end", marginTop: 16 },
});
