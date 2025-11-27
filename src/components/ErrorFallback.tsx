import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const navigation = useNavigation();

  useEffect(() => {
    // Log the error to your error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Something went wrong</Text>
        <ScrollView
          style={styles.errorBox}
          contentContainerStyle={{ padding: 8 }}
        >
          <Text style={styles.errorText}>{error.message}</Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              resetErrorBoundary();
              navigation.navigate('Home'); // Replace 'Home' with your default screen name
            }}
          >
            <Text style={styles.buttonText}>Try again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, styles.outlineButtonText]}>Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  box: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111',
  },
  errorBox: {
    width: '100%',
    maxHeight: 150,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    backgroundColor: '#1f2937', // primary
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  outlineButtonText: {
    color: '#1f2937',
  },
});
