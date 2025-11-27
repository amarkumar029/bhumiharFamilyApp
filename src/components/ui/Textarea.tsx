import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export interface TextareaProps extends TextInputProps {}

const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({ style, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        multiline
        style={[styles.textarea, style]}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };

const styles = StyleSheet.create({
  textarea: {
    minHeight: 60,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc', // equivalent to 'border-input'
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: 'transparent',
    color: '#000',
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow (Android)
    elevation: 1,
  },
});
