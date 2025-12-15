import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigation } from "@react-navigation/native";
// वास्तविक Redux hook को अलग नाम (useReduxSelector) के रूप में आयात करें
// import { useSelector as useReduxSelector } from "react-redux"; 

// Import mocks and simplified components
// Assuming types.ts is in the same folder
import { 
  formSchema, 
  HELP_OPTIONS, 
  useOnboard, 
  // useFormPersist, 
  // useStepPersist, 
  OnboardingFormValues 
} from "../../components/ui/form";
// } from '../../types/types'; 
import { toast } from '../../hooks/toast'; 
import { InputField } from '../../components/ui/Input'; 
import { SelectField } from '../../components/ui/SelectField'; 
import MultiSelectCreatable from "../../components/global/MultiSelectCreatable"; // ✅ Imported
import LocationSelector from "../../components/global/LocationSelector"; // ✅ Imported
import { DatePickerInput } from "../../components/global/DatePickerInput"; // ✅ Imported

// Mock Redux State Structure 
interface MockRootState {
    auth: {
        user: {
            onBoardingCompleted: boolean;
        } | null;
    };
}
// Mock selector का नाम बदला गया
const useMockSelector = (selector: (state: MockRootState) => any) => selector({
    auth: { user: { onBoardingCompleted: false } } // Mock state
});


export default function OnBoarding() {
  // --- All Hooks must be called unconditionally at the top level ---
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useMockSelector((state: MockRootState) => state.auth); 
  const navigation = useNavigation();

  const { onBoardUser: onBoardUserAction } = useOnboard();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      canHelpOut: [],
      canSeekHelp: [],
      caste: "BHUMIHAR",
      dateOfBirth: "1990-01-01",
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

  // 🛑 TEMPORARY FIX: Comment out the likely problematic custom hooks
  // If the app runs now, the error is inside these functions.
  // useFormPersist(form, "onboardingFormData"); 
  // useStepPersist(currentStep, setCurrentStep, "onboardingStep"); 
  
  // --- Effects ---
  useEffect(() => {
    if (user?.onBoardingCompleted) {
      navigation.navigate("Home"); 
    }
  }, [user, navigation]);

  // --- Functions ---
  const onSubmit = async (data: OnboardingFormValues) => {
    try {
      setIsSubmitting(true);
      await onBoardUserAction(data);

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

  // --- Render ---
  return (
    <FormProvider {...form}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Complete Basic Profile</Text>
          <Text style={styles.headerSubtitle}>Bhumihar Family</Text>
          <View style={styles.separator} />
        </View>
        
        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Controller
                control={form.control}
                name="fullName"
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    label="Full Name"
                    placeholder="Enter your fullname"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={error?.message}
                  />
                )}
              />
            </View>
            <View style={styles.halfWidth}>
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    label="Email"
                    placeholder="Enter your email address"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    type="email"
                    error={error?.message}
                  />
                )}
              />
            </View>
          </View>

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

          <Controller
            control={form.control}
            name="gender"
            render={({ field, fieldState: { error } }) => (
              <SelectField
                label="Gender"
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                  { value: "OTHER", label: "Other" },
                ]}
                error={error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="caste"
            render={({ field, fieldState: { error } }) => (
              <SelectField
                label="Caste"
                value={field.value}
                onChange={field.onChange}
                options={[{ value: "BHUMIHAR", label: "Bhumihar" }]}
                error={error?.message}
              />
            )}
          />
          
          {/* 1. ✅ Current Location: Replace Placeholder with LocationSelector */}
          <View style={styles.formItem}>
            <Text style={styles.label}>Current Location</Text>
            <Controller
              control={form.control}
              name="currentLocation"
              render={({ field, fieldState: { error } }) => (
                <View>
                  <LocationSelector
                    value={field.value}
                    onChange={field.onChange}
                    // error prop को LocationSelector के अंदर error state दिखाने के लिए पास करें
                    error={error} 
                  />
                  
                  {error?.city && <Text style={styles.errorMessage}>{error.city.message || "City is required."}</Text>}
                  {error?.state && <Text style={styles.errorMessage}>{error.state.message || "State is required."}</Text>}
                  {error?.mohalla && <Text style={styles.errorMessage}>{error.mohalla.message}</Text>}
                </View>
              )}
            />
          </View>

          {/* 2. ✅ Can Help Out: Replace Placeholder with MultiSelectCreatable */}
          <View style={styles.formItem}>
            <Text style={styles.label}>Areas You Can Help In</Text>
            <Controller
              control={form.control}
              name="canHelpOut"
              render={({ field, fieldState: { error } }) => (
                <View>
                  <MultiSelectCreatable
                    value={field.value}
                    onChange={field.onChange}
                    options={HELP_OPTIONS}
                    placeholder="Water Problem, Police case, Website Development, e.g."
                    error={error} 
                  />
                  {error?.message && <Text style={styles.errorMessage}>{error.message}</Text>}
                </View>
              )}
            />
          </View>

          {/* 3. ✅ Can Seek Help: Replace Placeholder with MultiSelectCreatable */}
          <View style={styles.formItem}>
            <Text style={styles.label}>Areas You Need Help In</Text>
            <Controller
              control={form.control}
              name="canSeekHelp"
              render={({ field, fieldState: { error } }) => (
                <View>
                  <MultiSelectCreatable
                    value={field.value}
                    onChange={field.onChange}
                    options={HELP_OPTIONS}
                    placeholder="Court Case, Land issue, Election campaign, e.g."
                    error={error} 
                  />
                  {error?.message && <Text style={styles.errorMessage}>{error.message}</Text>}
                </View>
              )}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>{"Submit"}</Text>
          )}
        </TouchableOpacity>
        
        <View style={{height: 50}} /> 
      </ScrollView>
    </FormProvider>
  );
}

// --- Stylesheet (React Native Styling) ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  headerContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D4ED8', // Text blue-2 approximation
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#374151', // Black/50 approximation
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E7EB', // Separator color
    marginVertical: 10,
  },
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfWidth: {
    width: '48%', // Approx gap-3
  },
  formItem: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    height: 48, 
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    justifyContent: 'center', 
  },
  picker: {
    height: 48, 
    width: '100%',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    height: 48,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  errorMessage: {
    marginTop: 6,
    fontSize: 12,
    color: '#EF4444',
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 6,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});