import React from 'react';
// 1. React Navigation का मुख्य कंटेनर इंपोर्ट करें
import { NavigationContainer } from '@react-navigation/native';

// 2. React Navigation से एक Stack Navigator बनाएं (सामान्य रूटिंग के लिए)
// आपको @react-navigation/stack या @react-navigation/native-stack इंस्टॉल करना होगा
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 3. आपके Provider को इंपोर्ट करें (यह मानकर कि यह पोर्ट हो चुका है)
import { AppProvider } from './src/components/providers/app-provider';

// 4. आपकी Routes (जो अब Screens होंगी) को इंपोर्ट करें
// यह AppRoutes.js नहीं होगा; इसके बजाय हम Stack Navigator के अंदर Screens को परिभाषित करेंगे।
// मान लेते हैं कि AppRoutes अब एक फ़ंक्शन है जो नेविगेटर को सेट करता है।
import { AppRoutes } from './AppRoutes'; // यह फ़ाइल अब React Native नेविगेटर बनाएगी

// Stack Navigator इंस्टेंस बनाएं
const Stack = createNativeStackNavigator();

function App() {
  return (
    // AppProvider (Redux, Query Client, etc.)
    <AppProvider> 
      {/* BrowserRouter की जगह NavigationContainer:
        यह React Native में रूटिंग संदर्भ (Routing Context) प्रदान करता है। 
      */}
      <NavigationContainer>
        {/* AppRoutes कंपोनेंट अब Stack Navigator को रेंडर करेगा,
          जिसके अंदर आपके सभी स्क्रीन/पेज होंगे। 
        */}
        <AppRoutes /> 
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;