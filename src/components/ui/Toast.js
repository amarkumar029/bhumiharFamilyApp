import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
// Lucide icons: आपको इसे इंस्टॉल करना होगा
import { X, AlertTriangle, CheckCircle, Info } from "lucide-react-native"; 

// --- 1. Constants and Types ---

const { height: screenHeight } = Dimensions.get("window");

export type ToastVariant = 'default' | 'destructive' | 'warning';

export interface ToastProps {
  id: string; // Toast को हटाने के लिए ID
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number; // milliseconds
  onClose?: (id: string) => void;
  // React Native में action बटन को सरल रखा गया है
  action?: {
    label: string;
    onPress: () => void;
  };
}

// --- 2. Styling (Based on CVA Variants) ---

const toastStyles = StyleSheet.create({
  // Colors based on shadcn/ui defaults (approximate)
  default: {
    backgroundColor: '#ffffff', // bg-background
    borderColor: '#e5e7eb', // border
    color: '#030712', // text-foreground
  },
  destructive: {
    backgroundColor: '#dc2626', // bg-destructive
    borderColor: '#991b1b', // border-destructive
    color: '#ffffff', // text-destructive-foreground
  },
  warning: {
    backgroundColor: '#fde047', // bg-yellow-400
    borderColor: '#f59e0b', // border-yellow-500
    color: '#030712', // text-foreground
  },
  
  // Basic Toast Container
  container: {
    width: '90%',
    maxWidth: 420, // md:max-w-[420px]
    borderRadius: 8, // rounded-md
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // shadow-lg
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingRight: 15, // Make space for the close button
  },
  title: {
    fontSize: 14, // text-sm
    fontWeight: '600', // font-semibold
    marginBottom: 4,
  },
  description: {
    fontSize: 14, // text-sm
    opacity: 0.9,
  },
  actionButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    // Styles will be dynamic based on variant
  },
  actionText: {
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
  },
});

// --- 3. Utility Function (Icon Selection) ---

const getIcon = (variant: ToastVariant) => {
  switch (variant) {
    case 'destructive':
      return <X size={20} color="#ffffff" />; // White icon for dark background
    case 'warning':
      return <AlertTriangle size={20} color="#030712" />; // Dark icon for yellow background
    case 'default':
    default:
      return <Info size={20} color="#030712" />;
  }
};

// --- 4. The Toast Component (Root) ---

const ToastRoot: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant = 'default',
  duration = 5000,
  onClose,
  action,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // For slide animation
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const styleSet = toastStyles[variant];

  // Animation logic
  const showToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Auto-close after duration
      if (duration !== Infinity && onClose) {
        timeoutRef.current = setTimeout(() => {
          hideToast();
        }, duration);
      }
    });
  };

  const hideToast = () => {
    clearTimeout(timeoutRef.current!);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) {
        onClose(id);
      }
    });
  };

  useEffect(() => {
    showToast();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Slide animation: starts off-screen (y=50) and slides up (y=0)
  const translateY = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], 
  });

  const iconComponent = getIcon(variant);

  return (
    <Animated.View 
      style={[
        toastStyles.container,
        {
          backgroundColor: styleSet.backgroundColor,
          borderColor: styleSet.borderColor,
          transform: [{ translateY }],
          opacity: fadeAnim,
        },
      ]}
    >
      {/* Icon (Optional) */}
      <View style={{ marginRight: 10 }}>
        {iconComponent}
      </View>

      <View style={toastStyles.content}>
        {title && (
          <Text style={[toastStyles.title, { color: styleSet.color }]}>
            {title}
          </Text>
        )}
        <Text style={[toastStyles.description, { color: styleSet.color }]}>
          {description}
        </Text>

        {/* Action Button */}
        {action && (
          <TouchableOpacity
            style={[
              toastStyles.actionButton,
              { 
                backgroundColor: variant === 'default' ? '#f3f4f6' : 'rgba(0,0,0,0.1)',
                borderColor: variant === 'default' ? '#e5e7eb' : 'transparent',
                marginTop: 8,
              }
            ]}
            onPress={() => {
              action.onPress();
              hideToast(); // Close after action
            }}
          >
            <Text 
              style={[
                toastStyles.actionText, 
                { color: variant === 'destructive' ? '#ffffff' : styleSet.color }
              ]}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Close Button */}
      <TouchableOpacity onPress={hideToast} style={toastStyles.closeButton}>
        <X size={16} color={variant === 'destructive' ? '#ffffff' : '#9ca3af'} />
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- 5. Toast Viewport / Manager (For positioning and stack management) ---

// React Native में, Toast Viewport सिर्फ एक कंटेनर है जो टोस्ट को निचले भाग में रखता है।
const ToastViewport: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <View style={styles.viewport}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  viewport: {
    // fixed bottom-0 right-0, flex-col
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center', // Toast को केंद्रित (center) करता है
    paddingBottom: Platform.OS === 'ios' ? 30 : 10, // iOS bottom safe area
    zIndex: 100,
  },
});

// Note: Provider और Toast Hook को एक अलग फ़ाइल में प्रबंधित किया जाएगा।
export { ToastRoot, ToastViewport };
// You would also need to create a Toast Context/Provider and a useToast hook 
// to manage the array of toasts displayed in the Viewport.