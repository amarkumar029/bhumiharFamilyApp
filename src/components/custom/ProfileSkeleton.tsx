import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const ProfileSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const Skeleton = ({ style }: { style: any }) => (
    <Animated.View style={[styles.skeleton, style, { opacity }]} />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Skeleton style={styles.avatar} />
        <View style={styles.headerText}>
          <Skeleton style={styles.name} />
          <Skeleton style={styles.subText} />
        </View>
      </View>

      {/* Text lines */}
      <View style={styles.section}>
        <Skeleton style={styles.line} />
        <Skeleton style={styles.lineMedium} />
        <Skeleton style={styles.lineLarge} />
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        <Skeleton style={styles.box} />
        <Skeleton style={styles.box} />
        <Skeleton style={styles.box} />
        <Skeleton style={styles.box} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  skeleton: {
    backgroundColor: "#D1D5DB",
    borderRadius: 6,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  headerText: {
    marginLeft: 16,
  },

  name: {
    width: 180,
    height: 22,
    marginBottom: 8,
  },

  subText: {
    width: 120,
    height: 14,
  },

  section: {
    marginTop: 24,
  },

  line: {
    width: "100%",
    height: 14,
    marginBottom: 12,
  },

  lineMedium: {
    width: "75%",
    height: 14,
    marginBottom: 12,
  },

  lineLarge: {
    width: "85%",
    height: 14,
  },

  grid: {
    marginTop: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  box: {
    width: "48%",
    height: 90,
    marginBottom: 12,
  },
});

export default ProfileSkeleton;