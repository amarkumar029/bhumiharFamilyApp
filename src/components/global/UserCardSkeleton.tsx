import React from "react";
import { View, StyleSheet } from "react-native";

const SkeletonBox = ({ style }: { style?: any }) => (
  <View style={[styles.skeleton, style]} />
);

export default function UserCardSkeleton() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <SkeletonBox style={styles.avatar} />

        <View>
          <SkeletonBox style={styles.title} />
          <SkeletonBox style={styles.subtitle} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <SkeletonBox style={styles.lineFull} />
        <SkeletonBox style={styles.lineThreeFourth} />

        <View style={styles.iconRow}>
          <SkeletonBox style={styles.icon} />
          <SkeletonBox style={styles.lineSmall} />
        </View>

        <View style={styles.iconRow}>
          <SkeletonBox style={styles.icon} />
          <SkeletonBox style={styles.lineMedium} />
        </View>

        <View style={styles.iconRow}>
          <SkeletonBox style={styles.icon} />
          <SkeletonBox style={styles.lineMediumSmall} />
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagRow}>
        {[1, 2, 3].map((i) => (
          <SkeletonBox key={i} style={styles.tag} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },

  skeleton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  title: {
    width: 130,
    height: 14,
    marginBottom: 8,
  },

  subtitle: {
    width: 180,
    height: 12,
  },

  content: {
    marginTop: 16,
    gap: 8,
  },

  lineFull: {
    width: "100%",
    height: 14,
  },

  lineThreeFourth: {
    width: "75%",
    height: 14,
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  icon: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },

  lineSmall: {
    width: 130,
    height: 12,
  },

  lineMedium: {
    width: 160,
    height: 12,
  },

  lineMediumSmall: {
    width: 150,
    height: 12,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },

  tag: {
    width: 80,
    height: 24,
    borderRadius: 12,
  },
});
