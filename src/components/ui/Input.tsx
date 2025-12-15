import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';

// RHF Controller के उपयोग के लिए प्रॉप्स को सरल बनाएं
interface InputProps extends TextInputProps {
  // RHF से प्राप्त मुख्य प्रॉप्स
  value: string;
  onChangeText: (text: string) => void;
  // onBlur: () => void; // TextInputProps में शामिल है

  // अतिरिक्त प्रॉप्स जो OnBoarding.tsx में error styling के लिए उपयोगी होंगे
  hasError?: boolean;
}

// कंपोनेंट को Input के रूप में एक्सपोर्ट करें ताकि यह आपके OnBoarding.tsx फाइल में मेल खाए
export function Input({ value, onChangeText, placeholder, keyboardType = 'default', hasError = false, ...rest }: InputProps) {
  return (
    // हम यहां View और Text (label/error) को हटाते हैं,
    // क्योंकि OnBoarding.tsx उन्हें Controller के बाहर रेंडर करता है।
    <TextInput
      style={[styles.textInput, hasError && styles.inputError]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType === 'email-address' ? 'email-address' : keyboardType} // Ensure prop type is correct
      autoCapitalize="none"
      placeholderTextColor="#A0A0A0"
      {...rest} // बाकी सभी TextInputProps (जैसे onBlur) को पास करें
    />
  );
}

const styles = StyleSheet.create({
  // --- TextInput (Input Field) Style ---
  textInput: {
    borderWidth: 1,
    borderColor: '#dddddd', // हल्का ग्रे बॉर्डर (approx. gray-300)
    borderRadius: 6, // गोल कोने (Rounded corners)
    height: 52, // फॉर्म नियंत्रणों के लिए मानक ऊँचाई (Standard height)
    paddingHorizontal: 12, // अंदर क्षैतिज पैडिंग (Horizontal padding inside)
    fontSize: 16,
    color: '#1F2937', // टेक्स्ट रंग
    backgroundColor: '#ffffff', // हल्का बैकग्राउंड रंग (Light background color)
  },

  // --- Error State Styles ---
  inputError: {
    borderColor: '#EF4444', // त्रुटि की स्थिति के लिए लाल बॉर्डर (Red border for error state)
    borderWidth: 2,
  },
});