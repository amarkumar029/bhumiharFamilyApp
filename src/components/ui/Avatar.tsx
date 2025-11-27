import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

type AvatarProps = {
  size?: number;
  children: React.ReactNode;
};

export function Avatar({ size = 40, children }: AvatarProps) {
  return (
    <View
      style={[
        styles.root,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {children}
    </View>
  );
}

type AvatarImageProps = {
  source: ImageSourcePropType;
};

export function AvatarImage({ source }: AvatarImageProps) {
  return <Image source={source} style={styles.image} />;
}

type AvatarFallbackProps = {
  text: string;
};

export function AvatarFallback({ text }: AvatarFallbackProps) {
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1d5db',
  },

  fallbackText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});
