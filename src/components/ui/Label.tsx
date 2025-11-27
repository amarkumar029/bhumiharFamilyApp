import React, { forwardRef } from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';

export interface LabelProps extends TextProps {
  disabled?: boolean;
  style?: TextStyle;
}

const Label = forwardRef<Text, LabelProps>(({ disabled = false, style, children, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      style={[
        styles.label,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
});

Label.displayName = 'Label';

export { Label };

const styles = StyleSheet.create({
  label: {
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
    lineHeight: 20, // leading-none approximation
    color: '#111827', // default text color
  },
  disabled: {
    opacity: 0.7,
    // cursor not supported in React Native
  },
});
