import React from 'react';
import { View, Text, StyleSheet, ViewProps, TextProps } from 'react-native';

/* ================= Card ================= */

export function Card({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

/* ================= Header ================= */

export function CardHeader({ children, style }: ViewProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

/* ================= Title ================= */

export function CardTitle({ children, style }: TextProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

/* ================= Description ================= */

export function CardDescription({ children, style }: TextProps) {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  );
}

/* ================= Content ================= */

export function CardContent({ children, style }: ViewProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

/* ================= Footer ================= */

export function CardFooter({ children, style }: ViewProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  header: {
    padding: 16,
    paddingBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  description: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },

  content: {
    padding: 16,
    paddingTop: 0,
  },

  footer: {
    padding: 16,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
