import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './src/components/providers/app-provider';
import { AppRoutes } from './AppRoutes'; // यह फ़ाइल अब React Native नेविगेटर बनाएगी

// Stack Navigator इंस्टेंस बनाएं
const Stack = createNativeStackNavigator();

function App() {
  return (
    // AppProvider (Redux, Query Client, etc.)
    <AppProvider>
      <NavigationContainer>
        <AppRoutes /> 
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;