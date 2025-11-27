import React, { ReactNode, forwardRef } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from 'react-native';

interface ScrollAreaProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  horizontal?: boolean;
}

const ScrollArea = forwardRef<ScrollView, ScrollAreaProps>(
  ({ children, style, contentContainerStyle, horizontal = false, ...props }, ref) => {
    return (
      <View style={[styles.container, style]}>
        <ScrollView
          ref={ref}
          horizontal={horizontal}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
          {...props}
        >
          {children}
        </ScrollView>
        <ScrollBar horizontal={horizontal} />
      </View>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

interface ScrollBarProps {
  horizontal?: boolean;
}

const ScrollBar = ({ horizontal = false }: ScrollBarProps) => {
  // Placeholder static scrollbar; dynamic scrollbar requires measuring content offset
  return <View style={[styles.scrollBar, horizontal ? styles.scrollBarHorizontal : styles.scrollBarVertical]} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
  },
  scrollBar: {
    position: 'absolute',
    backgroundColor: '#d1d5db', // bg-border
    borderRadius: 4,
  },
  scrollBarVertical: {
    width: 8,
    right: 2,
    top: 0,
    bottom: 0,
  },
  scrollBarHorizontal: {
    height: 8,
    left: 0,
    right: 0,
    bottom: 2,
  },
});

export { ScrollArea, ScrollBar };
