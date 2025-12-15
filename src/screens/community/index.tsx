import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Users, HelpCircle } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const Community = ({}: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.subtitle}>Bhumihar Community</Text>
        </View>

        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          {/* Help Community Members */}
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Seekers")}
          >
            <Users size={40} color="#000" style={styles.icon} />
            <Text style={styles.cardTitle}>Help Community Members</Text>
            <Text style={styles.cardDesc}>
              Share your knowledge, answer questions, and support others in
              their journey.
            </Text>
          </Pressable>

          {/* Get Help from Community */}
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Helpers")}
          >
            <HelpCircle size={40} color="#000" style={styles.icon} />
            <Text style={styles.cardTitle}>Get Help from Community</Text>
            <Text style={styles.cardDesc}>
              Ask questions, seek advice, and learn from experienced community
              members.
            </Text>
          </Pressable>
        </View>

        {/* Footer Text */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Join our vibrant community where members help each other grow,
            learn, and succeed together.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    gap: 28,
  },
  titleSection: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#2563eb",
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#f97316",
    marginTop: 4,
  },
  cardsContainer: {
    width: "100%",
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    elevation: 4,
  },
  icon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
  },
  cardDesc: {
    fontSize: 14,
    color: "rgba(0,0,0,0.6)",
  },
  footer: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280",
  },
});

export default Community;