import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFormPersist(
  form: UseFormReturn<any>,
  key: string = "form_data"
) {
  // Load saved data
  useEffect(() => {
    async function loadData() {
      try {
        const savedData = await AsyncStorage.getItem(key);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          Object.keys(parsed).forEach((fieldName) => {
            form.setValue(fieldName, parsed[fieldName]);
          });
        }
      } catch (e) {
        console.log("Error loading form data:", e);
      }
    }

    loadData();
  }, []);

  // Persist changes
  useEffect(() => {
    const subscription = form.watch(async (value) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.log("Error saving form data:", e);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, key]);
}
