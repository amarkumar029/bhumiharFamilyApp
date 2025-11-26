import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// आपके माइग्रेट किए गए स्क्रीन कंपोनेंट्स को इंपोर्ट करें
// सुनिश्चित करें कि LoginPage को default export के रूप में इंपोर्ट किया गया है
import LoginPage from './src/screens/login/LoginPage'; 
import ForgetPassword from './src/screens/forget-password/ForgotPasswordPage';
import SignupPage from './src/screens/signup/SignupPage';
import PostDetailsScreen from './src/components/global/PostDetailsScreen';

const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Signup" component={SignupPage} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ChatInbox" component={ChatInboxScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />

      {/* // यदि आप 'ForgetPassword' पर नेविगेट कर रहे हैं, तो इसे यहां परिभाषित करना होगा
      // <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} /> 
      // <Stack.Screen name="Signup" component={SignupScreen} /> 
      // <Stack.Screen name="Home" component={HomeScreen} />
      */}
    </Stack.Navigator>
  );
}