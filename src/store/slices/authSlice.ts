import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Native Storage को इम्पोर्ट करें, जिसे आपने store.ts में उपयोग किया था
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { AuthState, AuthResponse } from '@/types/auth'; // मान लें कि types पोर्ट हो चुके हैं

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 1. setCredentials (Same Logic)
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    // 2. updateCredential (Same Logic)
    updateCredential: (state, action: PayloadAction<Partial<AuthState['user']>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }; // Merge existing user data with new updates
      }
    },
    // 3. setUser (Same Logic)
    setUser:(state,action:PayloadAction<AuthResponse>) =>{
      state.user = action.payload.user;
    },
    // 4. setLoading (Same Logic)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // 5. setError (Same Logic)
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // 6. logout: Web Storage को Native Storage से बदलें
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // 🛑 localStorage.clear() की जगह AsyncStorage का उपयोग करें
      AsyncStorage.clear(); 
      // Note: Redux Persist के कारण, AsyncStorage.clear() 
      // ही persisted store को हटा देगा।
    },
  },
});

export const { setCredentials, setLoading, setError, logout ,setUser,updateCredential} = authSlice.actions;
export default authSlice.reducer;