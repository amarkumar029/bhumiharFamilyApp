import React, { useEffect, useState, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type ToastVariant = 'default' | 'destructive' | 'warning';

interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number; // in milliseconds
  onClose?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = 'default',
  duration = 3000,
  onClose,
  action,
}) => {
  const [visible, setVisible] = useState(true);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        onClose?.();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [slideAnim, duration, onClose]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        variantStyles[variant],
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      {action && (
        <TouchableOpacity onPress={action.onPress} style={styles.actionButton}>
          <Text style={styles.actionText}>{action.label}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    minWidth: 250,
    maxWidth: '90%',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    zIndex: 100,
  },
  content: { flex: 1 },
  title: { fontWeight: '600', fontSize: 14, color: '#000' },
  description: { fontSize: 12, color: '#333', marginTop: 2 },
  actionButton: { marginLeft: 8, padding: 6 },
  actionText: { color: '#1E90FF', fontWeight: '500' },
  closeButton: { marginLeft: 8, padding: 6 },
  closeText: { fontSize: 16, fontWeight: 'bold', color: '#555' },
});

const variantStyles: Record<ToastVariant, ViewStyle> = {
  default: { backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 1 },
  destructive: { backgroundColor: '#f8d7da', borderColor: '#f5c6cb', borderWidth: 1 },
  warning: { backgroundColor: '#fff3cd', borderColor: '#ffeeba', borderWidth: 1 },
};
