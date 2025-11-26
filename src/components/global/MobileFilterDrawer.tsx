import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { Filter, X } from "lucide-react-native";
import FilterSection from "./FilterSection";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: "helpers" | "seekers";
}

const SCREEN_HEIGHT = 700; // safe default, can be replaced with Dimensions

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Filter size={20} color="#4b5563" />
            <Text style={styles.title}>Filters</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <X size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <FilterSection type={type} isMobile onClose={onClose} />
        </View>
      </Animated.View>
    </Modal>
  );
};

export default MobileFilterDrawer;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  closeBtn: {
    padding: 6,
  },
  content: {
    flex: 1,
    paddingBottom: 16,
  },
});
