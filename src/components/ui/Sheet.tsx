import React, { useState, forwardRef, ReactNode } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface SheetProps {
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  visible?: boolean;
  onClose?: () => void;
}

const Sheet = ({ children, side = 'right', visible = false, onClose }: SheetProps) => {
  const [isVisible, setIsVisible] = useState(visible);
  const animatedValue = new Animated.Value(0);

  const openSheet = () => {
    setIsVisible(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => {
      setIsVisible(false);
      onClose?.();
    });
  };

  // Determine slide animation based on side
  const slideInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange:
      side === 'right'
        ? [300, 0]
        : side === 'left'
        ? [-300, 0]
        : side === 'bottom'
        ? [300, 0]
        : [-300, 0], // top
  });

  const transformStyle =
    side === 'left' || side === 'right'
      ? { transform: [{ translateX: slideInterpolation }] }
      : { transform: [{ translateY: slideInterpolation }] };

  return (
    <>
      {visible && <Modal transparent visible={isVisible} animationType="none">
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeSheet}>
          <Animated.View style={[styles.sheet, transformStyle, sideStyles[side]]}>
            {children}
            <TouchableOpacity style={styles.closeButton} onPress={closeSheet}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>}
    </>
  );
};

const sideStyles: Record<string, ViewStyle> = {
  right: { position: 'absolute', top: 0, bottom: 0, right: 0, width: '80%' },
  left: { position: 'absolute', top: 0, bottom: 0, left: 0, width: '80%' },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%' },
  top: { position: 'absolute', left: 0, right: 0, top: 0, height: '50%' },
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  closeText: {
    fontSize: 18,
    color: '#111827',
  },
});

// Optional subcomponents
const SheetHeader = ({ children, style }: { children: ReactNode; style?: ViewStyle }) => (
  <View style={[{ marginBottom: 8 }, style]}>{children}</View>
);

const SheetFooter = ({ children, style }: { children: ReactNode; style?: ViewStyle }) => (
  <View style={[{ marginTop: 8, flexDirection: 'row', justifyContent: 'flex-end' }, style]}>
    {children}
  </View>
);

const SheetTitle = ({ children, style }: { children: ReactNode; style?: ViewStyle }) => (
  <Text style={[{ fontSize: 18, fontWeight: '600', marginBottom: 4 }, style]}>{children}</Text>
);

const SheetDescription = ({ children, style }: { children: ReactNode; style?: ViewStyle }) => (
  <Text style={[{ fontSize: 14, color: '#6b7280', marginBottom: 8 }, style]}>{children}</Text>
);

export { Sheet, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
