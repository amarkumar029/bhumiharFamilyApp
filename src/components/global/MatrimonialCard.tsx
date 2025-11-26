import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, ScrollView } from "react-native";
import { Heart, Mail, MapPin } from "lucide-react-native";
import { useSendInterest } from "../../lib/react-query/mutation";
import { useToast } from "../../hooks/toast";
import { calculateAge } from "../../lib/utils";
import { useNavigation } from "@react-navigation/native";
import type { MatrimonialProfile } from "../../types/matrimonial";

interface Props {
  profile: MatrimonialProfile;
  onInterestSent?: () => void;
}

export default function MatrimonialCard({ profile, onInterestSent }: Props) {
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { mutate: sendInterest, isPending } = useSendInterest();
  const { toast } = useToast();
  const navigation = useNavigation();

  if (!isVisible) return null;

  const location = profile.currentLocation && typeof profile.currentLocation === "string"
    ? JSON.parse(profile.currentLocation)
    : profile.currentLocation;

  const income = typeof profile.income === "string" ? JSON.parse(profile.income) : profile.income;

  const locationText = location ? `${location.city}, ${location.state}` : "Location not specified";

  const handleSendInterest = () => {
    sendInterest(
      { receiverId: profile.id },
      {
        onSuccess: () => {
          setShowInterestDialog(false);
          setIsVisible(false);
          toast({ title: "Interest Sent", description: "Your interest has been sent successfully!" });
          onInterestSent?.();
        },
        onError: (error: any) => {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        },
      }
    );
  };

  const handleMessageClick = () => {
    navigation.navigate("Chat", { userId: profile.id, userName: profile.fullName });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate("Profile", { userId: profile.id })}>
        {profile.image ? (
          <Image source={{ uri: profile.image }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarFallbackText}>{profile.fullName.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        <View style={styles.headerText}>
          <Text style={styles.name}>{profile.fullName.split(" ").slice(0, 2).join(" ")}{profile.fullName.split(" ").length > 2 ? "..." : ""}, {profile.dateOfBirth && calculateAge(profile.dateOfBirth)} yrs</Text>
          <Text style={styles.badge}>{profile.profession || "Profession not specified"}</Text>
          <Text style={styles.badge}><MapPin size={12} /> {locationText}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Education</Text>
          <Text style={styles.value}>{profile.educationDegree || "Not specified"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Marital Status</Text>
          <Text style={styles.value}>{profile.maritalStatus || "Never Married"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Income</Text>
          <Text style={styles.value}>
            {income && typeof income === "object" && income.min !== undefined && income.max !== undefined
              ? `₹${income.min} - ₹${income.max}`
              : "Not specified"}
          </Text>
        </View>
        {profile.isPhoneNumberPublic && profile.phoneNumber && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{profile.phoneNumber}</Text>
          </View>
        )}
        {profile.bioData && (
          <View style={{ marginTop: 8 }}>
            <Text style={styles.label}>About</Text>
            <Text numberOfLines={2} style={styles.value}>{profile.bioData}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleMessageClick}>
          <Mail size={16} />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.interestButton]} onPress={() => setShowInterestDialog(true)}>
          <Heart size={16} color="red" />
          <Text style={styles.buttonText}>Interest</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showInterestDialog} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Send Interest to {profile.fullName}</Text>
            <View style={styles.modalBody}>
              {profile.image ? (
                <Image source={{ uri: profile.image }} style={styles.modalAvatar} />
              ) : (
                <View style={[styles.modalAvatar, styles.avatarFallback]}>
                  <Text style={styles.avatarFallbackText}>{profile.fullName.charAt(0).toUpperCase()}</Text>
                </View>
              )}
              <Text style={styles.modalText}>{profile.fullName}, {profile.dateOfBirth && calculateAge(profile.dateOfBirth)} yrs</Text>
              <Text>Are you sure you want to express interest in connecting with {profile.fullName}?</Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowInterestDialog(false)} style={styles.modalButton}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSendInterest} style={[styles.modalButton, styles.modalConfirmButton]} disabled={isPending}>
                {isPending ? <ActivityIndicator /> : <Text style={{ color: "white" }}>Send Interest</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "white", borderRadius: 8, margin: 8, padding: 8, elevation: 2 },
  header: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 8 },
  avatarFallback: { backgroundColor: "#ccc", justifyContent: "center", alignItems: "center" },
  avatarFallbackText: { fontSize: 24, fontWeight: "bold", color: "white" },
  headerText: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  badge: { fontSize: 12, color: "#555" },
  content: { marginTop: 8 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 2 },
  label: { fontSize: 12, color: "#888" },
  value: { fontSize: 14, fontWeight: "500" },
  footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  button: { flexDirection: "row", alignItems: "center", padding: 8, borderRadius: 6, borderWidth: 1, borderColor: "#ccc", flex: 1, justifyContent: "center", marginHorizontal: 4 },
  interestButton: { borderColor: "red" },
  buttonText: { marginLeft: 4 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 16, borderRadius: 8, width: "80%" },
  modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  modalBody: { alignItems: "center", marginBottom: 12 },
  modalAvatar: { width: 64, height: 64, borderRadius: 32, marginBottom: 8 },
  modalText: { fontWeight: "bold", marginBottom: 4 },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end" },
  modalButton: { padding: 8, marginLeft: 8 },
  modalConfirmButton: { backgroundColor: "red", borderRadius: 6, paddingHorizontal: 12 },
});
