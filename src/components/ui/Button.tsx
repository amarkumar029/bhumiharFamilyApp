import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variants[variant],
        sizes[size],
        disabled && styles.disabled,
      ]}
    >
      {children ? (
        children
      ) : (
        <Text style={[styles.text, textVariants[variant]]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },

  text: {
    fontSize: 14,
    fontWeight: '500',
  },

  disabled: {
    opacity: 0.5,
  },
});

/* ================= Variants ================= */

const variants: Record<ButtonVariant, ViewStyle> = {
  default: {
    backgroundColor: '#facc15', // yellow
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  outline: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'transparent',
  },
  secondary: {
    backgroundColor: '#e5e7eb',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
};

/* ================= Sizes ================= */

const sizes: Record<ButtonSize, ViewStyle> = {
  default: { height: 36, paddingHorizontal: 16 },
  sm: { height: 32, paddingHorizontal: 12 },
  lg: { height: 40, paddingHorizontal: 32 },
  icon: { height: 36, width: 36 },
};

/* ================= Text Variants ================= */

const textVariants: Record<ButtonVariant, ViewStyle> = {
  default: { color: '#000' },
  destructive: { color: '#fff' },
  outline: { color: '#111827' },
  secondary: { color: '#111827' },
  ghost: { color: '#111827' },
  link: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
};
