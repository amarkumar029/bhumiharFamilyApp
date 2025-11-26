// ------------------------------------
// 1. MatrimonialProfile: एकल यूजर का विस्तृत वैवाहिक प्रोफ़ाइल
// ------------------------------------
export interface MatrimonialProfile {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string | Date;
  religion: string | null;
  image: string | null;
  caste: string | null;
  familyType: string;
  
  // Partner Preferences (User द्वारा सेट की गई प्राथमिकताएं)
  partnerReligionPreference: string;
  partnerCastePreference: string;
  partnerMaritalStatusPreference: string;
  partnerAgeRange: string; // Stored as string, likely to be parsed later (e.g., "25-30")
  partnerHeightRange: string; // Stored as string, likely to be parsed later
  partnerLocationPreference: string;
  
  // Physical and Location Details
  height: number;
  weight: number;
  currentLocation: string;
  permanenentAddress: string;

  // Optional/Nullable Fields
  educationDegree?: string | null;
  profession?: string | null;
  income?: string | null;
  maritalStatus?: string | null;
  bioData?: string | null;
  
  // Contact Visibility
  isPhoneNumberPublic?: boolean;
  phoneNumber?: string | null;
}

// ------------------------------------
// 2. SearchFilters: API को भेजे जाने वाले पैरामीटर्स (Query Parameters)
// ------------------------------------
export interface SearchFilters {
  ageRange?: { min: number; max: number };
  heightRange?: { min: number; max: number };
  maritalStatus?: "SINGLE" | "DIVORCED" | "WIDOWED";
  religion?: string;
  caste?: string;
  educationDegree?: string;
  profession?: string;
  familyType?: "JOINT" | "NUCLEAR";
  income?: string;
  location?: string;
  motherTongue?: string;
  diet?: "VEGAN" | "NON_VEGAN";
  smokingHabits?: "OCCASIONALLY" | "REGULAR" | "NEVER";
  drinkingHabits?: "OCCASIONALLY" | "REGULAR" | "NEVER";
  
  // Pagination & Core Filter
  page?: number;
  gender: "MALE" | "FEMALE";
  limit?: number;
}

// ------------------------------------
// 3. SearchResponse: API से प्राप्त परिणाम संरचना
// ------------------------------------
export interface SearchResponse {
  profiles: MatrimonialProfile[];
  total: number;
  currentPage: number;
  totalPages: number;
}

// ------------------------------------
// 4. UserFilters: (Possible Redundant/Internal Filters)
// Note: This interface seems to overlap with PartnerPreferences/SearchFilters, 
// but is included as per the original code.
// ------------------------------------
export interface UserFilters {
  ageRange?: [number, number];
  religion?: string;
  caste?: string;
  maritalStatus?: string;
  location?: string;
  education?: string;
  occupation?: string;
}

// ------------------------------------
// 5. PartnerPreferences: User द्वारा सेट की गई विस्तृत प्राथमिकताएं (State/Context के लिए)
// ------------------------------------
export interface PartnerPreferences {
  ageRange?: [number, number];
  heightRange?: [number, number];
  education?: string;
  income?: [number, number];
  location?: string;
  occupation?: string;
  religion?: string;
  caste?: string;
  maritalStatus?: string;
}