// Switch.tsx
import React from 'react';
import { Switch as RNSwitch, View, StyleSheet, Platform } from 'react-native';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: object;
};

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, disabled, style }) => {
  return (
    <View style={[styles.container, style]}>
      <RNSwitch
        trackColor={{ false: '#e5e7eb', true: '#3b82f6' }} // bg-input / bg-primary
        thumbColor={Platform.OS === 'android' ? '#fff' : undefined} // bg-background
        ios_backgroundColor="#e5e7eb"
        onValueChange={onValueChange}
        value={value}
        disabled={disabled}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999, // rounded-full
    overflow: 'hidden',
  },
  switch: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }], // adjust size if needed
  },
});

export { Switch };
