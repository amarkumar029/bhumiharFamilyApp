import * as z from "zod";

// Simplified formSchema for demonstration. You must use your actual schema.
export const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  caste: z.enum(["BHUMIHAR"]),
  currentLocation: z.object({
    city: z.string().min(1),
    mohalla: z.string(),
    state: z.string().min(1),
  }),
  canHelpOut: z.array(z.string()),
  canSeekHelp: z.array(z.string()),
});

export type OnboardingFormValues = z.infer<typeof formSchema>;

// Mock Constants and Hooks
export const HELP_OPTIONS = [
  { value: "Water Problem", label: "Water Problem" },
  { value: "Police Case", label: "Police Case" },
  { value: "Web Development", label: "Web Development" },
];

export const useOnboard = () => ({
  onBoardUser: async (data: OnboardingFormValues) => {
    console.log("Onboarding data submitted:", data);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  },
});

export const useFormPersist = (form: any, key: string) => {
  // Mock persistor for RN
  useEffect(() => {
    // In a real app, use AsyncStorage here
    console.log(`Mock: Saving form data to AsyncStorage key: ${key}`);
  }, [form.watch()]);
};

export const useStepPersist = (step: number, setStep: any, key: string) => {
  // Mock step persistor for RN
  useEffect(() => {
    // In a real app, use AsyncStorage here
    console.log(`Mock: Saving step to AsyncStorage key: ${key}, value: ${step}`);
  }, [step]);
};