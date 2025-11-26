import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ---------------- Screens ----------------
import Login from "../screens/login/LoginPage";
import Signup from "../screens/signup/SignupPage";
import ForgetPassword from "../screens/forget-password/ForgotPasswordPage";

import Home from "../screens/home";
import Dashboard from "../screens/dashboard/DashboardHome";
import Social from "../screens/social";
import Post from "../screens/post";

import Community from "../screens/community";
import Seekers from "../screens/community/seekers";
import Helpers from "../screens/community/helpers";

import Matrimonial from "../screens/matrimonial";
import Search from "../screens/matrimonial/search";
import SearchResults from "../screens/matrimonial/search/result";
import RecievedInterest from "../screens/matrimonial/interests";
import SentInterest from "../components/global/SentInterest";

import Profile from "../screens/profile";
import ProfilePage from "../screens/profile/id";

import Chat from "../screens/chat";
import UserInbox from "../screens/chat/id";
import NewChat from "../screens/chat/new";

import Onboarding from "../screens/onboarding";
import NotFound from "../screens/not-found";

// ---------------- Stack Param Lists ----------------
export type RootStackParamList = {
  Auth: undefined;
  HomeRoutes: undefined;
  Onboarding: undefined;
  NotFound: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgetPassword: undefined;
};

export type ChatStackParamList = {
  ChatHome: undefined;
  Inbox: { userId: string };
  NewChat: undefined;
};

export type MatrimonialStackParamList = {
  MatrimonialHome: undefined;
  Search: undefined;
  SearchResults: undefined;
  RecievedInterest: undefined;
  SentInterest: undefined;
};

export type CommunityStackParamList = {
  CommunityHome: undefined;
  Seekers: undefined;
  Helpers: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Dashboard: undefined;
  Social: undefined;
  Post: { id?: string };
  CommunityRoutes: undefined;
  MatrimonialRoutes: undefined;
  ChatRoutes: undefined;
  Profile: undefined;
  ProfilePage: { id: string };
};

// ---------------- Create Stacks ----------------
const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();
const MatrimonialStack = createNativeStackNavigator<MatrimonialStackParamList>();
const CommunityStack = createNativeStackNavigator<CommunityStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// ---------------- AUTH NAVIGATOR ----------------
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
}

// ---------------- CHAT NAVIGATOR ----------------
function ChatNavigator() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="ChatHome" component={Chat} />
      <ChatStack.Screen name="Inbox" component={UserInbox} />
      <ChatStack.Screen name="NewChat" component={NewChat} />
    </ChatStack.Navigator>
  );
}

// ---------------- MATRIMONIAL NAVIGATOR ----------------
function MatrimonialNavigator() {
  return (
    <MatrimonialStack.Navigator screenOptions={{ headerShown: false }}>
      <MatrimonialStack.Screen
        name="MatrimonialHome"
        component={Matrimonial}
      />
      <MatrimonialStack.Screen name="Search" component={Search} />
      <MatrimonialStack.Screen
        name="SearchResults"
        component={SearchResults}
      />
      <MatrimonialStack.Screen
        name="RecievedInterest"
        component={RecievedInterest}
      />
      <MatrimonialStack.Screen name="SentInterest" component={SentInterest} />
    </MatrimonialStack.Navigator>
  );
}

// ---------------- COMMUNITY NAVIGATOR ----------------
function CommunityNavigator() {
  return (
    <CommunityStack.Navigator screenOptions={{ headerShown: false }}>
      <CommunityStack.Screen name="CommunityHome" component={Community} />
      <CommunityStack.Screen name="Seekers" component={Seekers} />
      <CommunityStack.Screen name="Helpers" component={Helpers} />
    </CommunityStack.Navigator>
  );
}

// ---------------- HOME NAVIGATOR ----------------
function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={Home} />
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen name="Social" component={Social} />
      <HomeStack.Screen name="Post" component={Post} />
      <HomeStack.Screen
        name="CommunityRoutes"
        component={CommunityNavigator}
      />
      <HomeStack.Screen
        name="MatrimonialRoutes"
        component={MatrimonialNavigator}
      />
      <HomeStack.Screen name="ChatRoutes" component={ChatNavigator} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="ProfilePage" component={ProfilePage} />
    </HomeStack.Navigator>
  );
}

// ---------------- MAIN APP NAVIGATION ----------------
export default function AppNavigator() {
  const isLoggedIn = false; // Replace with Redux or Context value

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="HomeRoutes" component={HomeNavigator} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
          </>
        )}

        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}