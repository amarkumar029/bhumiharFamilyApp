import { MatrimonialProfile } from '../../hooks/useMatrimonial';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// NOTE: चूंकि आपने useMatrimonial hook प्रदान नहीं किया,
// यहां MatrimonialProfile का एक अनुमानित इंटरफ़ेस (Interface) है।
export interface MatrimonialProfile {
  id: string;
  name: string;
  age: number;
  // अन्य आवश्यक फ़ील्ड
}

interface PartnerPreferences {
  ageRange?: [number, number]; // [minAge, maxAge]
  heightRange?: [number, number]; // [minHeightCm, maxHeightCm]
  education?: string;
  income?: [number, number]; // [minIncome, maxIncome]
  location?: string;
  occupation?: string;
  religion?: string;
  caste?: string;
  maritalStatus?: string;
}

interface ProfileState {
  profile: MatrimonialProfile[];
  partnerPreferences: PartnerPreferences | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: [],
  partnerPreferences: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfiles(state, action: PayloadAction<MatrimonialProfile[]>) {
      state.profile = action.payload;
    },
    appendProfiles(state, action: PayloadAction<MatrimonialProfile[]>) {
      state.profile.push(...action.payload); // Array spread की जगह push का उपयोग करें
    },
    setPartnerPreferences(state, action: PayloadAction<PartnerPreferences>) {
      state.partnerPreferences = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setProfiles,
  appendProfiles,
  setPartnerPreferences,
  setLoading,
  setError,
} = profileSlice.actions;

export const selectProfiles = (state: RootState) => state.profile.profile;
export const selectPreferences = (state: RootState) => state.profile.partnerPreferences;
// Note: RootState type store.ts में परिभाषित है
export default profileSlice.reducer;