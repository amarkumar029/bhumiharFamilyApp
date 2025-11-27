import React, { useState, ReactNode } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

interface TooltipProps {
  children: ReactNode;
}

interface TooltipContentProps {
  children: ReactNode;
  visible: boolean;
  onRequestClose: () => void;
  style?: object;
}

export const TooltipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In RN, this is just a placeholder; provider is optional.
  return <>{children}</>;
};

export const Tooltip: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const TooltipTrigger: React.FC<{ children: ReactNode; onPress?: () => void }> = ({
  children,
  onPress,
}) => {
  return <Pressable onPress={onPress}>{children}</Pressable>;
};

export const TooltipContent: React.FC<TooltipContentProps> = ({
  children,
  visible,
  onRequestClose,
  style,
}) => {
  const [opacity] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, opacity]);

  if (!visible) return null;

  return (
    <Modal transparent={true} animationType="none" onRequestClose={onRequestClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.tooltip, style, { opacity }]}>
          <Text style={styles.tooltipText}>{children}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center', // You can customize alignment
    alignItems: 'center',
  },
  tooltip: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    maxWidth: 250,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
  },
});
