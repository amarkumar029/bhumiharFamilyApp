import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

/* ================= Breadcrumb ================= */

export function Breadcrumb({ children }: { children: React.ReactNode }) {
  return <View style={styles.nav}>{children}</View>;
}

/* ================= List ================= */

export function BreadcrumbList({ children }: { children: React.ReactNode }) {
  return <View style={styles.list}>{children}</View>;
}

/* ================= Item ================= */

export function BreadcrumbItem({ children }: { children: React.ReactNode }) {
  return <View style={styles.item}>{children}</View>;
}

/* ================= Link ================= */

export function BreadcrumbLink({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Text style={[styles.link, !onPress && styles.disabled]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

/* ================= Current Page ================= */

export function BreadcrumbPage({ children }: { children: React.ReactNode }) {
  return <Text style={styles.page}>{children}</Text>;
}

/* ================= Separator ================= */

export function BreadcrumbSeparator() {
  return <Text style={styles.separator}>›</Text>;
}

/* ================= Ellipsis ================= */

export function BreadcrumbEllipsis() {
  return (
    <View style={styles.ellipsis}>
      <Text style={styles.ellipsisText}>⋯</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  link: {
    fontSize: 14,
    color: '#6b7280',
  },

  disabled: {
    opacity: 0.6,
  },

  page: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },

  separator: {
    marginHorizontal: 6,
    color: '#9ca3af',
    fontSize: 14,
  },

  ellipsis: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ellipsisText: {
    fontSize: 16,
    color: '#6b7280',
  },
});
