import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // equivalent to bg-gray-50
    justifyContent: 'center',
    alignItems: 'center',
  },
});