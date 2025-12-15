import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options = [],
  error,
}: SelectFieldProps) {
  return (
    <View style={styles.formItem}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputContainer, error && styles.inputError]}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          style={styles.picker}
          dropdownIconColor="#000"
        >
          <Picker.Item label="Select option" value="" />
          {options.map(option => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
}
// Styles are shared with the main component below

const styles = StyleSheet.create({
  // --- Form Item Wrapper Style ---
  formItem: {
    marginBottom: 10, // Standard vertical spacing between form fields
  },

  // --- Label Style ---
  label: {
    fontSize: 14,
    fontWeight: '600', // Semi-bold look
    marginBottom: 8,
    color: '#374151', // Dark text color (approx. gray-700)
  },

  // --- Picker/Input Container Style ---
  inputContainer: {
    // This container holds the Picker and gives it the border style
    borderWidth: 1,
    borderColor: '#dddddd', // Light gray border (approx. gray-300)
    borderRadius: 6, // Rounded corners
    height: 52, // Standard height for form controls (h-12 equivalent)
    overflow: 'hidden', // Important for Android to contain the Picker within the border
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  // --- Picker Component Style ---
  picker: {
    // The Picker itself. It takes up the space of the inputContainer.
    // height: 48,
    width: '100%',
    color: '#1F2937', // Text color
    // Note: Padding/text alignment inside the Picker is often platform-dependent.
  },

  // --- Error State Styles ---
  inputError: {
    borderColor: '#EF4444', // Red border for error state
    borderWidth: 2,
  },
  
  // --- Error Message Style ---
  errorMessage: {
    marginTop: 6,
    fontSize: 12,
    color: '#EF4444', // Red text for error message
  },
});