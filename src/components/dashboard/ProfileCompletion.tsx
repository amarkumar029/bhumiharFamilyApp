import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CheckCircle, User, AlertTriangle, Sparkles } from "lucide-react-native";
import Svg, { Circle } from "react-native-svg";
// import { useGetProfileCompletion } from "../../hooks/useGetProfileCompletion"; // your hook
import { useGetProfileCompletion } from "../../lib/react-query/queries"

export default function ProfileCompletion() {
  const { data, isPending } = useGetProfileCompletion();
  const navigation = useNavigation();

  const percentage = data?.profileCompletion || 0;
  const incompleteFields = data?.inCompleteFields || [];

  const getColor = () => {
    if (percentage < 34) return "#ef4444"; // red
    if (percentage < 67) return "#f59e0b"; // amber
    return "#22c55e"; // green
  };

  const color = getColor();

  // Circle Animation Values
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <CheckCircle color="#3b82f6" size={20} />
        <Text style={styles.title}>Profile Completion</Text>

        {percentage < 100 && !isPending && (
          <TouchableOpacity
            onPress={() => alert("Incomplete Fields:\n" + incompleteFields.join("\n"))}
          >
            <AlertTriangle color="#f59e0b" size={20} />
          </TouchableOpacity>
        )}

        {percentage === 100 && <Sparkles color="#eab308" size={20} />}
      </View>

      {/* Loading State */}
      {isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6b7280" />
        </View>
      ) : (
        <View style={styles.content}>
          {/* Progress Circle */}
          <View style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
              {/* Background */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
                fill="none"
              />

              {/* Progress */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference}`}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                fill="none"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </Svg>

            {/* Percentage Text */}
            <View style={styles.centerText}>
              <Text style={[styles.percentageText, { color }]}>{percentage}%</Text>
            </View>
          </View>

          {/* Status Message */}
          <Text style={styles.statusText}>
            {percentage < 50
              ? "Complete your profile to connect better!"
              : percentage < 100
              ? "Almost there! Finish your profile."
              : "🎉 Excellent! Your profile is complete!"}
          </Text>

          {/* Button */}
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: percentage === 100 ? "#22c55e" : "#7c3aed" },
            ]}
            onPress={() => navigation.navigate("Profile")}
          >
            <User color="white" size={18} style={{ marginRight: 6 }} />
            <Text style={styles.buttonText}>
              {percentage === 100 ? "View Profile" : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    color: "#111827",
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: 15,
  },
  centerText: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 24,
    fontWeight: "700",
  },
  statusText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
    color: "#4b5563",
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: "row",
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
