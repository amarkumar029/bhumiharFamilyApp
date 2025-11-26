// ------------------------------------
// 1. Location Details
// ------------------------------------
type Location = {
  city: string;
  location: string;
  country: string;
};

// ------------------------------------
// 2. PersonalDetails
// ------------------------------------
type PersonalDetails = {
  phoneNumber: string;
  email: string;
  fullName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string; // Date stored as string (e.g., ISO format)
  image: string | null;
  bioData: string | null;
  currentLocation: Location;
  languages: string[];
  educationDegree: string;
  specializedDegree: string;
  university: string;
  passingYear: number;
  skills: string[];
};

// ------------------------------------
// 3. CommunityDetails (Exported)
// ------------------------------------
export type CommunityDetails = {
  canHelpOut: string[]; // Keywords/topics user can help with
  canSeekHelp: string[]; // Keywords/topics user needs help with
  currentJobRole: string;
  achievements: string[];
  hobbies: string[];
  profession: string | null;
  sector: string;
  income: string; // Stored as string for flexibility (e.g., salary range)
};

// ------------------------------------
// 4. Matrimonial Sub-Types
// ------------------------------------
type Sibling = {
  gender: string;
  maritalStatus: string;
  name: string;
  profession?: string;
};

type PartnerPreference = {
  min: number;
  max: number;
};

// ------------------------------------
// 5. MatrimonialDetails (Exported)
// ------------------------------------
export type MatrimonialDetails = {
  zodiacSign: string;
  height: number; // in cm
  weight: number; // in kg
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  motherTongue: string;
  smokingHabits: "NEVER" | "OCCASIONALLY" | "REGULARLY";
  diet: "VEGAN" | "NON_VEGAN" | "VEGETARIAN";
  bodyType: "SLIM" | "AVERAGE" | "ATHLETIC" | "PLUS_SIZE";
  familyType: "NUCLEAR" | "JOINT";
  fatherOccupation: string;
  motherOccupation: string;
  siblings: Sibling[];
  familyIncome: string;
  familyBasedOut: string;
  aboutFamily: string;
  expectations: string;
  
  // Partner Preferences
  partnerAgeRange: PartnerPreference;
  partnerHeightRange: PartnerPreference;
  partnerEducationPreference: string[];
  partnerIncomeRange: PartnerPreference;
  partnerLocationPreference: string[];
  partnerOccupationPreference: string[];
  partnerMaritalStatusPreference: string;
};

// ------------------------------------
// 6. UserProfile Root Type (Exported)
// ------------------------------------
export type UserProfile = {
  personalDetails: PersonalDetails;
  communityDetails: CommunityDetails;
  matrimonialDetails: MatrimonialDetails;
};

// ------------------------------------
// 7. Utility Type (Exported)
// ------------------------------------
export type BasicUserProfile = UserProfile["personalDetails"];