import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { LoginForm } from './LoginForm';
import LoginForm from './LoginForm';
// Note: LoginForm will also need to be converted to React Native

// 仮の値 (Temporary values, these should come from your constants file)
const COMMUNITY_NAME = "Bhumihar Family"; 

export default function LoginPage() {
  const navigation = useNavigation();
  
//   const LoginForm = () => (
//     <View style={{padding: 15, alignItems: 'center'}}><Text style={{color: '#666'}}>[LoginForm Placeholder]</Text></View>
//   );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer} // नया स्टाइल जोड़ें
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS और Android के लिए अलग व्यवहार
        keyboardVerticalOffset={0} // यदि आप हेडर का उपयोग कर रहे हैं तो इसे एडजस्ट करें
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Facebook-style layout */}
            <View style={styles.mainContainer}>
              
              {/* Left Text/Logo Section */}
              <View style={styles.leftSection}>
                <Text style={styles.logoText}>{COMMUNITY_NAME}</Text>
                <Text style={{fontSize: 20,textAlign:'center'}}>
                    Connect with family members and share your moments.
                </Text>
              </View>

              {/* Right Form Section */}
              <View style={styles.rightSection}>
                <View style={styles.formCard}>
                  
                  <LoginForm />

                  {/* Forgot Password Link */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgetPassword')}
                    style={styles.forgotPasswordContainer}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgotten password?
                    </Text>
                  </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Onboarding')}
                    style={styles.forgotPasswordContainer}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgotten password?
                    </Text>
                  </TouchableOpacity>
                  
                  {/* Separator */}
                  <View style={styles.separator} />

                  {/* Create New Account Button */}
                  <View style={styles.createAccountButtonContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Signup')} // Assuming 'Signup' is the route name
                      style={styles.createAccountButton}
                    >
                      <Text style={styles.createAccountButtonText}>
                        Create new account
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
//     backgroundColor: '#f0f2f5', 
    backgroundColor: '#ffffff',
  },
  keyboardAvoidingContainer: {
    flex: 1, // यह सुनिश्चित करता है कि KeyboardAvoidingView पूरी स्क्रीन को कवर करे
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', 
    paddingVertical: 50, 
    paddingHorizontal: 16,
  },
  mainContainer: {
    width: '100%',
    maxWidth: 1200,
    flexDirection: 'column',
    gap: 32, 
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  leftSection: {
    width: '100%',
    maxWidth: 450, 
    alignItems: 'center', 
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  logoText: {
    fontSize: 48, 
    fontWeight: '900',
    color: '#ff5c00', 
    letterSpacing: -1,
    marginBottom: 5,
  },
//   taglineText: {
//     fontSize: 20, 
//     color: '#1c1e21', 
//     textAlign: 'center', // **यहां फिक्स किया गया**
//     fontWeight: '400',
//   },
  rightSection: {
    width: '100%',
    maxWidth: 400, 
    alignSelf: 'center',
  },
  formCard: {
    backgroundColor: 'white', 
    // Shadow implementation for both platforms
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, 
        shadowRadius: 3.84,
      },
      android: {
        // elevation: 5, 
      },
    }),
    borderRadius: 8,
    padding: 20, 
  },
  forgotPasswordContainer: {
    paddingTop: 18, 
    // paddingBottom: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 18, 
    color: '#ff5c00',
  },
  separator: {
    borderBottomWidth: 1, 
    borderColor: '#e5e7eb', 
    marginBottom: 18, 
    marginTop: 18,
  },
  createAccountButtonContainer: {
    alignItems: 'center',
  },
  createAccountButton: {
    paddingVertical: 18, 
//     paddingHorizontal: 24,
    borderRadius: 6,
    backgroundColor: '#42b72a', 
    ...Platform.select({
        ios: {
            shadowColor: 'rgba(0,0,0,0.1)',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1, 
            shadowRadius: 1,
        },
        android: {
            elevation: 2, 
        }
    }),
  },
  createAccountButtonText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'white',
  },
});