import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './src/screens/login/LoginPage'; 
// import ForgetPassword from './src/screens/forget-password/ForgotPasswordPage';
// import SignupPage from './src/screens/signup/SignupPage';

// import Home from './src/screens/home';
// import Dashboard from './src/screens/dashboard';
// import Post from "./src/screens/post";
// import Social from "./src/screens/social";

// import Community from "./src/screens/community";
// import Seekers from "./src/screens/community/seekers";
// import Helpers from "./src/screens/community/helpers";

// import Matrimonial from "./src/screens/matrimonial";
// import Search from "./src/screens/matrimonial/search";
// import SearchResults from "./src/screens/matrimonial/search/result";
// import RecievedInterest from "./src/screens/matrimonial/interests";
// import SentInterest from "./src/components/global/SentInterest";

// import Profile from "./src/screens/profile";
// import ProfilePage from "./src/screens/profile/id";

// import Chat from "./src/screens/chat";
// import UserInbox from "./src/screens/chat/id";
// import NewChat from "./src/screens/chat/new";

// import Onboarding from "./src/screens/onboarding";
// import NotFound from "./src/screens/not-found";

const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginPage} />
      {/* <Stack.Screen name="Signup" component={SignupPage} /> */}
      {/* <Stack.Screen name="ForgetPassword" component={ForgetPassword} /> */}

      {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name='Dashboard' component={Dashboard} /> 
      <Stack.Screen name="Social" component={Social} />  */}

      {/* <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Seekers" component={Seekers} />
      <Stack.Screen name="Helpers" component={Helpers} /> */}

      {/* <Stack.Screen name="Matrimonial" component={Matrimonial} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
      <Stack.Screen name="RecievedInterest" component={RecievedInterest} />
      <Stack.Screen name="SentInterest" component={SentInterest} /> */}

      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} /> */}

      {/* <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="UserInbox" component={UserInbox} />
      <Stack.Screen name="NewChat" component={NewChat} /> */}

      {/* <Stack.Screen name="Onboarding" component={Onboarding} /> */}
      {/* <Stack.Screen name="NotFound" component={NotFound} /> */}
    </Stack.Navigator>
  );
}