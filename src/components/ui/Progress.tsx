import React, { forwardRef } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ProgressProps {
  value?: number; // 0 - 100
  style?: ViewStyle;
  trackColor?: string;
  progressColor?: string;
}

const Progress = forwardRef<View, ProgressProps>(
  ({ value = 0, style, trackColor = '#dbeafe', progressColor = '#3b82f6', ...props }, ref) => {
    // Clamp value between 0 and 100
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <View
        ref={ref}
        style={[styles.track, { backgroundColor: trackColor }, style]}
        {...props}
      >
        <View
          style={[
            styles.indicator,
            {
              backgroundColor: progressColor,
              width: `${clampedValue}%`,
            },
          ]}
        />
      </View>
    );
  }
);

Progress.displayName = 'Progress';

const styles = StyleSheet.create({
  track: {
    height: 8, // approximate to h-2
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#dbeafe', // default track color
  },
  indicator: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#3b82f6', // default progress color
  },
});

export { Progress };
