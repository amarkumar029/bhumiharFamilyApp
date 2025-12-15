import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
// Note: You must install this package in your React Native project:
// npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Persists the form data to AsyncStorage and loads it on initialization.
 * @param form - The UseFormReturn object from react-hook-form.
 * @param key - The key under which to store the form data in AsyncStorage.
 */

export function useFormPersist(
  form: UseFormReturn<any>,
  key: string = 'form_data'
) {
  // 1. Load data from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(key);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          // Iterate over saved keys and set form values
          Object.keys(parsedData).forEach((fieldName) => {
            // Use form.setValue with shouldValidate: true if you want immediate validation
            form.setValue(fieldName, parsedData[fieldName]);
          });
          console.log(`[FormPersist] Loaded data for key: ${key}`);
        }
      } catch (e) {
        console.error(`[FormPersist] Failed to load data from AsyncStorage for key: ${key}`, e);
      }
    };
    loadData();
  }, [key, form]); // Dependency array includes key and form instance

  // 2. Watch form changes and save to AsyncStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Save data asynchronously
      const saveData = async () => {
        try {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
          console.error(`[FormPersist] Failed to save data to AsyncStorage for key: ${key}`, e);
        }
      };
      saveData();
    });
    
    // Cleanup function to unsubscribe from watch when component unmounts
    return () => subscription.unsubscribe();
  }, [form, key]);
}

/**
 * Persists the current step number to AsyncStorage and loads it on initialization.
 * @param currentStep - The current step number state.
 * @param setCurrentStep - The state setter function for the current step.
 * @param key - The key under which to store the step number.
 */
export function useStepPersist(
  currentStep: number,
  setCurrentStep: (step: number) => void,
  key: string = 'current_step'
) {
  // 1. Load step from AsyncStorage on component mount
  useEffect(() => {
    const loadStep = async () => {
      try {
        const savedStep = await AsyncStorage.getItem(key);
        if (savedStep) {
          setCurrentStep(parseInt(savedStep, 10));
          console.log(`[StepPersist] Loaded step: ${savedStep} for key: ${key}`);
        }
      } catch (e) {
        console.error(`[StepPersist] Failed to load step from AsyncStorage for key: ${key}`, e);
      }
    };
    loadStep();
  }, [key, setCurrentStep]); // Dependency array includes key and setter

  // 2. Save step to AsyncStorage whenever currentStep changes
  useEffect(() => {
    const saveStep = async () => {
        try {
            await AsyncStorage.setItem(key, currentStep.toString());
        } catch (e) {
            console.error(`[StepPersist] Failed to save step to AsyncStorage for key: ${key}`, e);
        }
    };
    saveStep();
  }, [currentStep, key]);
}