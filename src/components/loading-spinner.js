import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// Note: If you specifically want to use the 'Loader' icon from lucide-react-native 
// (or another icon library) instead of the native ActivityIndicator, 
// आप ActivityIndicator की जगह Icon कंपोनेंट का उपयोग कर सकते हैं।
// लेकिन ActivityIndicator ज़्यादा performance-friendly होता है।

export function LoadingSpinner() {
  return (
    // min-h-screen flex items-center justify-center bg-gray-50
    <View style={styles.container}>
      {/* Loader className="animate-spin rounded-full h-8 w-8 text-blue-2" 
        की जगह Native ActivityIndicator:
      */}
      <ActivityIndicator 
        size="large" // h-8 w-8 के लिए 'large' या custom size (जैसे 32)
        color="#3b82f6" // text-blue-2 के लिए एक ब्लू कलर कोड (उदाहरण के लिए Tailwind blue-500)
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // min-h-screen (Full screen)
    flex: 1, 
    // flex items-center justify-center
    alignItems: 'center',
    justifyContent: 'center',
    // bg-gray-50
    backgroundColor: '#f9fafb', 
  },
});