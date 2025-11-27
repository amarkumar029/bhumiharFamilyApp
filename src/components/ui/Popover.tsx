import React, { useState, forwardRef, ReactNode } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';

interface PopoverProps {
  children: ReactNode;
}

interface PopoverTriggerProps {
  children: ReactNode;
  onPress?: () => void;
}

interface PopoverContentProps {
  children: ReactNode;
  style?: ViewStyle;
}

const Popover = ({ children }: PopoverProps) => <>{children}</>;

const PopoverTrigger = ({ children, onPress }: PopoverTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const PopoverContent = forwardRef<View, PopoverContentProps>(({ children, style }, ref) => {
  const [visible, setVisible] = useState(false);
  const animatedValue = new Animated.Value(0);

  const openPopover = () => {
    setVisible(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const closePopover = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => setVisible(false));
  };

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const opacity = animatedValue;

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableOpacity style={styles.overlay} onPress={closePopover}>
        <Animated.View
          ref={ref}
          style={[
            styles.popover,
            style,
            { transform: [{ scale }], opacity },
          ]}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
});

PopoverContent.displayName = 'PopoverContent';

const PopoverAnchor = ({ children }: { children: ReactNode }) => <>{children}</>;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popover: {
    width: 288, // approx w-72
    padding: 16,
    backgroundColor: '#fff', // replace with theme if needed
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
});

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
