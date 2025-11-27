import React, { useState, forwardRef, ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface NavigationMenuProps {
  children: ReactNode;
  style?: ViewStyle;
}

interface NavigationMenuTriggerProps {
  title: string;
  children: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface NavigationMenuContentProps {
  children: ReactNode;
  style?: ViewStyle;
}

const NavigationMenu = forwardRef<View, NavigationMenuProps>(({ children, style }, ref) => {
  return (
    <View ref={ref} style={[styles.menuContainer, style]}>
      {children}
    </View>
  );
});

const NavigationMenuTrigger = forwardRef<TouchableOpacity, NavigationMenuTriggerProps>(
  ({ title, children, style, textStyle }, ref) => {
    const [open, setOpen] = useState(false);
    const animatedValue = new Animated.Value(0);

    const toggleMenu = () => {
      const toValue = open ? 0 : 1;
      Animated.timing(animatedValue, {
        toValue,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
      setOpen(!open);
    };

    const rotate = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <View style={styles.triggerContainer}>
        <TouchableOpacity ref={ref} style={[styles.trigger, style]} onPress={toggleMenu}>
          <Text style={[styles.triggerText, textStyle]}>{title}</Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Text style={styles.arrow}>⌄</Text>
          </Animated.View>
        </TouchableOpacity>
        {open && <View style={styles.contentContainer}>{children}</View>}
      </View>
    );
  }
);

const NavigationMenuContent = forwardRef<View, NavigationMenuContentProps>(({ children, style }, ref) => {
  return (
    <View ref={ref} style={[styles.content, style]}>
      {children}
    </View>
  );
});

// Example usage of a menu item
const NavigationMenuItem = ({ children, onPress }: { children: ReactNode; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuItemText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  triggerContainer: {
    position: 'relative',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
    color: '#111827',
  },
  arrow: {
    fontSize: 12,
    color: '#111827',
  },
  contentContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 14,
    color: '#111827',
  },
});

export {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
};
