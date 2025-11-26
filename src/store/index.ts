import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';

// 🛑 Web Storage (redux-persist/lib/storage) की जगह Native Storage का उपयोग करें
// आपको @react-native-async-storage/async-storage को इंस्टॉल करना होगा:
// npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// मान लें कि ये Redux Slices पोर्ट हो चुके हैं
import authReducer from './slices/authSlice';
import postReducer from "./slices/postSlice";
import commentReducer from "./slices/commentSlice";
import userReducer from "./slices/userSlice";
import profileReducer from "./slices/profileSlice";

// 1. Persist Config: storage को AsyncStorage से बदलें
const persistConfig = {
  key: 'auth',
  // Native Storage का उपयोग करें
  storage: AsyncStorage, 
  // 'auth' reducer के अलावा अन्य reducers को persist करने के लिए,
  // आपको उन्हें 'whitelist' में जोड़ना पड़ सकता है या key को 'root' बनाना पड़ सकता है
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// 2. Store Configuration: यह हिस्सा समान रहेगा
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    post: postReducer,
    comment: commentReducer,
    user: userReducer,
    profile: profileReducer,
  },
  // 3. Middleware Configuration: यह हिस्सा redux-persist के लिए आवश्यक है और समान रहेगा
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4. Persistor Creation: यह भी समान रहेगा
export const persistor = persistStore(store);

// 5. Types: Types भी समान रहेंगे
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;