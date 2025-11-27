import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type AlertVariant = 'default' | 'destructive';

type AlertProps = {
  variant?: AlertVariant;
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Alert({
  variant = 'default',
  children,
  style,
}: AlertProps) {
  return (
    <View style={[styles.base, styles[variant], style]}>
      {children}
    </View>
  );
}

type AlertTitleProps = {
  children: React.ReactNode;
};

export function AlertTitle({ children }: AlertTitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

type AlertDescriptionProps = {
  children: React.ReactNode;
};

export function AlertDescription({ children }: AlertDescriptionProps) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  default: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
  },

  destructive: {
    backgroundColor: '#fff',
    borderColor: '#dc2626',
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },

  description: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
});
