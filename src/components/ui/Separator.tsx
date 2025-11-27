import React, { forwardRef } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

interface SeparatorProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
}

const Separator = forwardRef<View, SeparatorProps>(
  ({ orientation = 'horizontal', color = '#d1d5db', thickness = 1, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          orientation === 'horizontal'
            ? { height: thickness, width: '100%' }
            : { width: thickness, height: '100%' },
          { backgroundColor: color },
          style,
        ]}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };
