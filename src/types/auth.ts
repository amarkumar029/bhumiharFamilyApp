// ------------------------------------
// 1. Core User Interface
// ------------------------------------
export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  // Nested Profile interface (defined below)
  profile?: Profile;
  onBoardingCompleted?: boolean;
  fullName?: string;
  image?: string;
  // Matrimonial/Profile flags are crucial for logic
  isMatrimonialProfile: boolean;
  isProfileCompleted: boolean;
}

// ------------------------------------
// 2. Profile Interface (Nested)
// ------------------------------------
export interface Profile {
  onboardingCompleted: boolean;
  // अन्य profile fields यहाँ जोड़े जा सकते हैं
  // เช่น: gender?: string; dob?: Date;
}

// ------------------------------------
// 3. Auth State Interface (For Redux/Context)
// ------------------------------------
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ------------------------------------
// 4. API Request Interfaces
// ------------------------------------

export interface LoginCredentials {
  // identifier field को split किया गया है
  phoneNumber?: string;
  email?: string;
  password: string;
}

export interface SignupCredentials {
  phoneNumber: string;
  password: string;
  otp?: string;
}

// ------------------------------------
// 5. API Response Interface
// ------------------------------------

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}