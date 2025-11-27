// Sidebar.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_WIDTH_COLLAPSED = 60;

type SidebarContextProps = {
  open: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { open } = useSidebar();
  const width = open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED;

  return (
    <Animated.View style={[styles.sidebar, { width }]}>
      <ScrollView>{children}</ScrollView>
    </Animated.View>
  );
};

export const SidebarHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

export const SidebarMenuItem: React.FC<{
  label: string;
  onPress?: () => void;
}> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuItemText}>{label}</Text>
    </TouchableOpacity>
  );
};

export const SidebarTrigger: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <TouchableOpacity style={styles.trigger} onPress={toggleSidebar}>
      <Text style={styles.triggerText}>☰</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: "#1f1f1f",
    height: "100%",
    paddingTop: 40,
  },
  header: {
    padding: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    color: "#fff",
    fontSize: 16,
  },
  trigger: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 100,
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 6,
  },
  triggerText: {
    color: "#fff",
    fontSize: 20,
  },
});
