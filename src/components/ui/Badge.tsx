import React from 'react';
import { Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  variant = 'default',
  children,
  style,
  textStyle,
}: BadgeProps) {
  return (
    <View style={[styles.base, variantStyles[variant], style]}>
      <Text style={[styles.text, textVariants[variant], textStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },

  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

const variantStyles: Record<string, ViewStyle> = {
  default: {
    backgroundColor: '#2563eb',
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: '#3b82f6',
    borderColor: 'transparent',
  },
  destructive: {
    backgroundColor: '#dc2626',
    borderColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#d1d5db',
  },
};

const textVariants: Record<string, TextStyle> = {
  default: { color: '#ffffff' },
  secondary: { color: '#ffffff' },
  destructive: { color: '#ffffff' },
  outline: { color: '#111827' },
};
