import { MatrimonialProfile } from '@/hooks/useMatrimonial'; // Make sure the path and type are ported
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface Definitions are 100% reusable
interface PartnerPreferences {
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
    // Current profiles को नए array से बदलता है
    setProfiles(state, action: PayloadAction<MatrimonialProfile[]>) {
      state.profile = action.payload;
    },
    // मौजूदा profiles array के अंत में नए profiles जोड़ता है (Pagination/Lazy Loading के लिए)
    appendProfiles(state, action: PayloadAction<MatrimonialProfile[]>) {
      state.profile = [...state.profile, ...action.payload];
    },
    // Partner Preferences object को सेट करता है
    setPartnerPreferences(state, action: PayloadAction<PartnerPreferences>) {
      state.partnerPreferences = action.payload;
    },
    // Loading state को मैनेज करता है
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Error state को मैनेज करता है
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Action Creators and Reducer Export are 100% reusable
export const {
  setProfiles,
  appendProfiles,
  setPartnerPreferences,
  setLoading,
  setError,
} = profileSlice.actions;

export default profileSlice.reducer;