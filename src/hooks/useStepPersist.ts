import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useStepPersist(
  currentStep: number,
  setCurrentStep: (step: number) => void,
  key: string = "current_step"
) {
  // Load saved step
  useEffect(() => {
    async function loadStep() {
      try {
        const saved = await AsyncStorage.getItem(key);
        if (saved) {
          setCurrentStep(parseInt(saved, 10));
        }
      } catch (e) {
        console.log("Error loading step:", e);
      }
    }
    loadStep();
  }, []);

  // Save step
  useEffect(() => {
    async function saveStep() {
      try {
        await AsyncStorage.setItem(key, currentStep.toString());
      } catch (e) {
        console.log("Error saving step:", e);
      }
    }
    saveStep();
  }, [currentStep, key]);
}
