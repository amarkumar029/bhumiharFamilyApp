// Tabs.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

type TabsProps = {
  children: React.ReactNode;
};

type TabsListProps = {
  children: React.ReactNode;
  style?: any;
};

type TabsTriggerProps = {
  title: string;
  index: number;
  activeIndex: number;
  onPress: (index: number) => void;
  style?: any;
};

type TabsContentProps = {
  children: React.ReactNode;
  index: number;
  activeIndex: number;
  style?: any;
};

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <View>{children}</View>;
};

export const TabsList: React.FC<TabsListProps> = ({ children, style }) => {
  return <ScrollView horizontal contentContainerStyle={[styles.tabsList, style]}>{children}</ScrollView>;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ title, index, activeIndex, onPress, style }) => {
  const isActive = index === activeIndex;
  return (
    <TouchableOpacity
      style={[styles.tabTrigger, isActive && styles.tabTriggerActive, style]}
      onPress={() => onPress(index)}
    >
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ children, index, activeIndex, style }) => {
  if (index !== activeIndex) return null;
  return <View style={[styles.tabContent, style]}>{children}</View>;
};

// Styles
const styles = StyleSheet.create({
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    padding: 4,
    borderRadius: 8,
  },
  tabTrigger: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: '#e0e0e0',
  },
  tabTriggerActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: '#555',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabContent: {
    marginTop: 8,
  },
});
