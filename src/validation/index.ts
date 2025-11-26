import * as z from "zod";

// Basic Personal Details Schema
export const personalDetailsSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\+?[0-9]+$/, "Invalid phone number format"),

  email: z.string().email("Invalid email address"),

  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Please select a gender",
  }),

  dateOfBirth: z.string({ required_error: "Please select a date of birth" }),

  caste: z
    .string()
    .min(1, "Caste is required")
    .max(50, "Caste must not exceed 50 characters"),

  nationality: z
    .string()
    .min(1, "Nationality is required")
    .max(50, "Nationality must not exceed 50 characters"),

  zodiacSign: z.enum([
    "ARIES",
    "TAURUS",
    "GEMINI",
    "CANCER",
    "LEO",
    "VIRGO",
    "LIBRA",
    "SCORPIO",
    "SAGITTARIUS",
    "CAPRICORN",
    "AQUARIUS",
    "PISCES",
  ], { required_error: "Please select a zodiac sign" }),

  ethnicity: z
    .string()
    .min(1, "Ethnicity is required")
    .max(50, "Ethnicity must not exceed 50 characters"),

  bioData: z.string().nullable(),

  height: z.number().min(100, "Height must be at least 100 cm").max(250, "Height must not exceed 250 cm"),

  weight: z.number().min(30, "Weight must be at least 30 kg").max(200, "Weight must not exceed 200 kg"),

  currentLocation: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
  }),

  pincode: z
    .string()
    .min(4, "Pincode must be at least 4 digits")
    .max(10, "Pincode must not exceed 10 digits")
    .regex(/^[0-9]+$/, "Pincode must contain only numbers"),

  languages: z.array(z.string()).min(1, "At least one language is required"),

  educationDegree: z.string().min(1, "Education degree is required"),

  specializedDegree: z.string().min(1, "Specialized degree is required"),

  university: z.string().min(1, "University is required").max(100, "University name must not exceed 100 characters"),

  passingYear: z
    .number()
    .min(1950, "Invalid passing year")
    .max(new Date().getFullYear() + 10, "Invalid passing year"),

  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

// Matrimonial Schema
export const matrimonialSchema = z.object({
  familyType: z.enum(["JOINT", "NUCLEAR"]),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  siblings: z
    .array(
      z.object({
        gender: z.string().min(1, "Sibling gender is required"),
        maritalStatus: z.string().min(1, "Sibling marital status is required"),
      })
    )
    .min(1, "At least one sibling is required"),
  familyIncome: z.string().min(1, "Family income is required"),
  familyBasedOut: z.string().min(1, "Family based out is required"),

  partnerAgeRange: z.object({
    min: z.number().min(18, "Minimum age should be at least 18"),
    max: z.number().max(100, "Maximum age should be at most 100"),
  }),

  partnerHeightRange: z.object({
    min: z.number().min(100, "Minimum height should be at least 100 cm"),
    max: z.number().max(250, "Maximum height should be at most 250 cm"),
  }),

  partnerEducationPreference: z.array(z.string()).min(1, "At least one education preference is required"),
  partnerIncomeRange: z.object({ min: z.number().min(0), max: z.number() }),
  partnerLocationPreference: z.array(z.string()).min(1, "At least one location preference is required"),
  partnerOccupationPreference: z.array(z.string()).min(1, "At least one occupation preference is required"),
  partnerReligionPreference: z.array(z.string()).min(1, "At least one religion preference is required"),
  partnerCastePreference: z.array(z.string()).min(1, "At least one caste preference is required"),
  partnerMaritalStatusPreference: z.array(z.string()).min(1, "At least one marital status preference is required"),

  aboutFamily: z.string().min(1, "About family is required"),
  expectations: z.string().min(1, "Expectations are required"),
  profileCreatedBy: z.enum(["SELF", "PARENT", "SIBLING", "RELATIVE", "FRIEND"]),
  profileVisibility: z.enum(["ALL", "PREMIUM_ONLY", "MATCHED_ONLY"]),
  lastActive: z.date(),

  maritalStatus: z.enum(["SINGLE", "DIVORCED", "WIDOWED"]),
  nationality: z.string().min(1, "Nationality is required"),
  ethnicity: z.string().min(1, "Ethnicity is required"),
  profession: z.string().min(1, "Profession is required"),
  income: z.string().min(1, "Income is required"),
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(200),
  bodyType: z.enum(["SLIM", "ATHLETIC", "AVERAGE", "CURVY", "PLUS_SIZE"]),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  motherTongue: z.string().min(1, "Mother tongue is required"),
  drinkingHabits: z.enum(["OCCASIONALLY", "REGULAR", "NEVER"]),
  smokingHabits: z.enum(["OCCASIONALLY", "REGULAR", "NEVER"]),
  diet: z.enum(["VEGAN", "NON_VEGAN"]),
  zodiacSign: z.enum([
    "ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO",
    "LIBRA", "SCORPIO", "SAGITTARIUS", "CAPRICORN", "AQUARIUS", "PISCES",
  ]),
});

export type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;
export type MatrimonialFormData = z.infer<typeof matrimonialSchema>;