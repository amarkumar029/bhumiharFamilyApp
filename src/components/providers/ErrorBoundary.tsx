import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 18 }}>
          Something went wrong.
        </Text>
        <Button title="Reload App" onPress={() => setHasError(false)} />
      </View>
    );
  }

  return children;
};

export default ErrorBoundary;