import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

// --- Assuming these local files exist in your React Native project ---
// NOTE: Please ensure these paths are correct in your RN project structure.
// NOTE: Zod schema, types, constants, and hooks
import { formSchema } from "../../validation";
import { HELP_OPTIONS } from "../../constants/help-option";
import { toast } from "../../hooks/toast";
import { useOnboard } from "../../hooks/useOnboard";
import { RootState } from "../../store";
import { useFormPersist, useStepPersist } from "../../hooks/useFormPersistor";

// NOTE: UI Components - These must be adapted for React Native
// You need to replace Input, Select, and Button with your React Native versions.
// Assuming simple functional components or mocks for now:
import { Input } from "../../components/ui/Input"; // React Native Input Component
import { Select } from "../../components/ui/Select"; // React Native Select Component (e.g., using Picker)
// import { Button } from "../../components/ui/Button"; // React Native Button Component

// NOTE: Global/Custom Components
import MultiSelectCreatable from "../../components/global/MultiSelectCreatable"; // Must be RN-compatible
import LocationSelector from "../../components/global/LocationSelector"; // Must be RN-compatible
import { DatePickerInput } from "../../components/global/DatePickerInput"; // ✅ Imported


export default function OnBoarding() {
  // --- Hooks must be called unconditionally at the top level ---
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // React Redux Selector
  const { user } = useSelector((state: RootState) => state.auth);
  
  // React Native Navigation
  const navigation = useNavigation(); // Replaces useNavigate

  const { onBoardUser: onBoardUserAction } = useOnboard();

  // --- Effects ---
  useEffect(() => {
    // Navigating back to home screen (e.g., "/") in RN stack
    if (user?.onBoardingCompleted) {
      navigation.navigate("Home"); // Assuming "Home" is your main screen route
    }
  }, [user, navigation]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      canHelpOut: [],
      canSeekHelp: [],
      caste: "BHUMIHAR",
      dateOfBirth: "",
      email: "",
      fullName: "",
      gender: "MALE",
      currentLocation: {
        city: "",
        mohalla: "",
        state: "",
      },
    },
  });

  // Persist hooks (Ensure these are RN-compatible hooks using AsyncStorage or similar)
  useFormPersist(form, "onboardingFormData");
  useStepPersist(currentStep, setCurrentStep, "onboardingStep");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!data.currentLocation?.state) {
      toast({
        title: "Location required",
        description: "Please select your state, city and mohalla",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        ...data,
        location: {
          state: data.currentLocation.state,
          city: data.currentLocation.city ?? "",
          mohalla: data.currentLocation.mohalla ?? "",
        },
      };

      // ❌ IMPORTANT: remove currentLocation
      delete (payload as any).currentLocation;

      await onBoardUserAction(payload);

      toast({
        title: "Profile completed",
        description: "Your profile has been successfully completed!",
      });
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to complete profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Utility function for displaying errors in a common style ---
  const getErrorMessage = (field: keyof z.infer<typeof formSchema>) => {
    const error = form.formState.errors[field];
    return error?.message || (error?.city?.message || error?.state?.message || error?.mohalla?.message);
  };


  return (
    <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Complete Basic Profile</Text>
        <Text style={styles.headerSubtitle}>Bhumihar Family</Text>
        <View style={styles.separator} />
      </View>

      {/* React Native does not have a native <form> element; use handleSubmit from RHF */}
      <View style={styles.formView}>
        {/* Full Name and Email in one row */}
        <View style={styles.row}>
          {/* Full Name */}
          <View style={styles.halfWidth}>
            <Controller
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <View style={styles.formItem}>
                  <Text style={styles.label}>Full Name</Text>
                  <Input
                    placeholder="Enter your fullname"
                    value={field.value}
                    onChangeText={field.onChange} // Use onChangeText for RN Input
                  />
                  {getErrorMessage('fullName') && <Text style={styles.errorMessage}>{getErrorMessage('fullName')}</Text>}
                </View>
              )}
            />
          </View>

          {/* Email */}
          <View style={styles.halfWidth}>
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <View style={styles.formItem}>
                  <Text style={styles.label}>Email</Text>
                  <Input
                    keyboardType="email-address"
                    placeholder="Enter your email address"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                  {getErrorMessage('email') && <Text style={styles.errorMessage}>{getErrorMessage('email')}</Text>}
                </View>
              )}
            />
          </View>
        </View>

        {/* Date of Birth and Gender in one row */}
        <View style={styles.row}>
          {/* Date of Birth */}
          <View style={styles.halfWidth}>
            <Controller
              control={form.control}
              name="dateOfBirth"
              render={({ field, fieldState: { error } }) => (
                <DatePickerInput
                  label="Date of Birth"
                  value={field.value}
                  onChange={field.onChange}
                  error={error?.message}
                />
              )}
            />
          </View>

          {/* Gender */}
          <View style={styles.halfWidth}>
            <Controller
              control={form.control}
              name="gender"
              render={({ field }) => (
                <View style={styles.formItem}>
                  <Text style={styles.label}>Gender</Text>
                  {/* Assuming Select is a custom RN component (e.g., Picker or custom modal) */}
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      { value: "MALE", label: "Male" },
                      { value: "FEMALE", label: "Female" },
                      { value: "OTHER", label: "Other" },
                    ]}
                  />
                  {getErrorMessage('gender') && <Text style={styles.errorMessage}>{getErrorMessage('gender')}</Text>}
                </View>
              )}
            />
          </View>
        </View>

        {/* Caste */}
        <Controller
          control={form.control}
          name="caste"
          render={({ field }) => (
            <View style={styles.formItem}>
              <Text style={styles.label}>Caste</Text>
              {/* Assuming Select is a custom RN component */}
              <Select
                onValueChange={field.onChange}
                value={field.value}
                options={[{ value: "BHUMIHAR", label: "Bhumihar" }]}
              />
              {getErrorMessage('caste') && <Text style={styles.errorMessage}>{getErrorMessage('caste')}</Text>}
            </View>
          )}
        />

        {/* Current Location (LocationSelector) */}
        {/* NOTE: LocationSelector needs the full field value/onChange, and internal Controller logic (if any) */}
        <Controller
          control={form.control}
          name="currentLocation"
          render={({ field }) => (
            <View style={styles.formItem}>
              <Text style={styles.label}>Current Location</Text>
              <LocationSelector
                // We must pass RHF control to LocationSelector if it needs to register sub-fields (city, state, mohalla)
                control={form.control}
                name="currentLocation" 
                value={field.value}
                onChange={field.onChange} // LocationSelector must handle updating nested fields
              />
              {/* Displaying nested errors directly from form state */}
              {(form.formState.errors.currentLocation?.city || form.formState.errors.currentLocation?.state) && 
                <Text style={styles.errorMessage}>
                {form.formState.errors.currentLocation?.city?.message || 
                  form.formState.errors.currentLocation?.state?.message || 
                  "Location details are incomplete."}
                </Text>
              }
            </View>
          )}
        />

        {/* Areas You Can Help In (MultiSelectCreatable) */}
        <Controller
            control={form.control}
            name="canHelpOut"
            render={({ field }) => (
                <View style={styles.formItem}>
                    <Text style={styles.label}>Areas You Can Help In</Text>
                    <MultiSelectCreatable
                        control={form.control}
                        name="canHelpOut"
                        options={HELP_OPTIONS}
                        placeholder="Water Problem, Police case, Website Development, e.g."
                        value={field.value}
                        onChange={field.onChange}
                    />
                    {getErrorMessage('canHelpOut') && <Text style={styles.errorMessage}>{getErrorMessage('canHelpOut')}</Text>}
                </View>
            )}
        />

        {/* Areas You Need Help In (MultiSelectCreatable) */}
        <Controller
          control={form.control}
          name="canSeekHelp"
          render={({ field }) => (
            <View style={styles.formItem}>
              <Text style={styles.label}>Areas You Need Help In</Text>
              <MultiSelectCreatable
                control={form.control}
                name="canSeekHelp"
                options={HELP_OPTIONS}
                placeholder="Court Case, Land issue, Election campaign, e.g."
                value={field.value}
                onChange={field.onChange}
              />
              {getErrorMessage('canSeekHelp') && <Text style={styles.errorMessage}>{getErrorMessage('canSeekHelp')}</Text>}
            </View>
          )}
        />

        {/* Submit Button */}
        <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
        >
            {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : (
                <Text style={styles.buttonText}>Submit</Text>
            )}
        </TouchableOpacity>        
        <View style={{height: 40}} /> 
      </View>
    </ScrollView>
  );
}

// --- Stylesheet (React Native Styling) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Matches light background
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 30,
  },
  headerContainer: {
    // marginBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D4ED8', // blue-2 approximation
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280', // black/50 approximation
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E7EB', // Separator color
    marginVertical: 15,
  },
  formView: {
    width: '100%',
    backgroundColor: '#FFFFFF', // Form background
    padding: 10,
    paddingVertical: 0,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  halfWidth: {
    width: '48%', 
  },
  formItem: {
    marginBottom: 15, // Spacing between form fields
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#374151',
  },
  errorMessage: {
    marginTop: 4,
    fontSize: 12,
    color: '#EF4444',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#1D4ED8', // blue-2
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});