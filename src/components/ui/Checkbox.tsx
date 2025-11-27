import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Text } from 'react-native';

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Checkbox({
  value,
  onValueChange,
  disabled = false,
  style,
}: CheckboxProps) {
  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={[
        styles.base,
        value && styles.checked,
        disabled && styles.disabled,
        style,
      ]}
    >
      {value && <Text style={styles.check}>✓</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#2563eb', // primary
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  checked: {
    backgroundColor: '#2563eb',
  },

  disabled: {
    opacity: 0.5,
  },

  check: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 14,
  },
});
