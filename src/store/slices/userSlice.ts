import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsers } from "../../types"; // Make sure '@/types' (and IUsers) is ported

// Interface Definitions are 100% reusable
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface User {
  users: IUsers[];
  pagination: Pagination | null;
}

interface LocationFilter {
  states: string[];
  cities: string[];
  locations: string[];
}

interface Keywords {
  canHelpOut: string[];
  canSeekHelp: string[];
}

interface UserSlice {
  user: User;
  loading: boolean;
  error: string | null;
  keywords: Keywords;
  locationFilter: LocationFilter;
  profession: string | null;
  checkoutList: IUsers[];
  notInterestedIds: string[];
}

const initialState: UserSlice = {
  user: {
    users: [],
    pagination: null,
  },
  loading: false,
  error: null,
  keywords: {
    canHelpOut: [],
    canSeekHelp: [],
  },
  locationFilter: {
    states: [],
    cities: [],
    locations: [],
  },
  profession: null,
  checkoutList: [],
  notInterestedIds: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // --- User List Management ---
    addUsers: (state, action: PayloadAction<IUsers[]>) => {
      // Append new users (used for lazy loading/pagination)
      state.user.users = [...state.user.users, ...action.payload];
    },
    setUsers: (state, action: PayloadAction<IUsers[]>) => {
      // Overwrite the entire user list (used for initial fetch/new search)
      state.user.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<{ id: string }>) => {
      state.user.users = state.user.users.filter(
        (user) => user.id !== action.payload.id
      );
    },
    updatePagination: (state, action: PayloadAction<Pagination>) => {
      state.user.pagination = action.payload;
    },
    resetUsers: (state) => {
      state.user.users = [];
      state.user.pagination = null;
    },

    // --- Keyword Filters (CanHelpOut / CanSeekHelp) ---
    changeFilter: (
      state,
      action: PayloadAction<{
        category: "canHelpOut" | "canSeekHelp";
        keyword: string;
      }>
    ) => {
      const { category, keyword } = action.payload;
      if (!state.keywords[category].includes(keyword)) {
        state.keywords[category].push(keyword);
      }
    },
    removeFilter: (
      state,
      action: PayloadAction<{
        category: "canHelpOut" | "canSeekHelp";
        keyword: string;
      }>
    ) => {
      const { category, keyword } = action.payload;
      state.keywords[category] = state.keywords[category].filter(
        (k) => k !== keyword
      );
    },
    clearFilters: (state) => {
      state.keywords.canHelpOut = [];
      state.keywords.canSeekHelp = [];
      state.profession = null;
    },
    setFilter: (state, action: PayloadAction<Keywords>) => {
      state.keywords = action.payload;
    },
    setProfession: (state, action: PayloadAction<string | null>) => {
      state.profession = action.payload;
    },

    // --- Global State Management ---
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // --- Location Filters ---
    setLocationFilter: (state, action: PayloadAction<LocationFilter>) => {
      state.locationFilter = action.payload;
    },
    addState: (state, action: PayloadAction<string>) => {
      if (!state.locationFilter.states.includes(action.payload)) {
        state.locationFilter.states.push(action.payload);
        // Clear children filters when parent changes
        state.locationFilter.cities = [];
        state.locationFilter.locations = [];
      }
    },
    removeState: (state, action: PayloadAction<string>) => {
      state.locationFilter.states = state.locationFilter.states.filter(
        (s) => s !== action.payload
      );
      // Clear children filters when parent changes
      state.locationFilter.cities = [];
      state.locationFilter.locations = [];
    },
    addCity: (state, action: PayloadAction<string>) => {
      if (!state.locationFilter.cities.includes(action.payload)) {
        state.locationFilter.cities.push(action.payload);
        // Clear children filters when parent changes
        state.locationFilter.locations = [];
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.locationFilter.cities = state.locationFilter.cities.filter(
        (city) => city !== action.payload
      );
      // Clear children filters when parent changes
      state.locationFilter.locations = [];
    },
    addLocation: (state, action: PayloadAction<string>) => {
      if (!state.locationFilter.locations.includes(action.payload)) {
        state.locationFilter.locations.push(action.payload);
      }
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      state.locationFilter.locations = state.locationFilter.locations.filter(
        (location) => location !== action.payload
      );
    },
    clearLocationFilter: (state) => {
      state.locationFilter = {
        states: [],
        cities: [],
        locations: [],
      };
    },

    // --- Checkout List Management ---
    addToCheckoutList: (state, action: PayloadAction<IUsers>) => {
      if (!state.checkoutList.some((user) => user.id === action.payload.id)) {
        state.checkoutList.push(action.payload);
      }
    },
    setCheckoutList: (state, action: PayloadAction<IUsers[]>) => {
      state.checkoutList = action.payload;
    },
    removeFromCheckoutList: (
      state,
      action: PayloadAction<{ userId: string; type: "helpers" | "seekers" }>
    ) => {
      // Note: Assumes IUsers has a 'checkOutType' property to filter correctly
      state.checkoutList = state.checkoutList.filter(
        (user) =>
          !(
            user.checkOutType === action.payload.type &&
            user.id === action.payload.userId
          )
      );
    },

    // --- Not Interested List Management ---
    addToNotInterested: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (!state.notInterestedIds.includes(userId)) {
        state.notInterestedIds.push(userId);
        // Also remove from the main visible users list
        state.user.users = state.user.users.filter(
          (user) => user.id !== userId
        );
      }
    },
    setNotInterestedIds: (state, action: PayloadAction<string[]>) => {
      // Note: Your original logic was: state.notInterestedIds = [...state.notInterestedIds, ...action.payload];
      // This appends to the existing list. We retain that logic.
      state.notInterestedIds = [...state.notInterestedIds, ...action.payload];
    },
    clearNotInterested: (state) => {
      state.notInterestedIds = [];
    },
  },
});

export const {
  addUsers,
  setUsers,
  deleteUser,
  updatePagination,
  resetUsers,
  changeFilter,
  setLoading,
  setFilter,
  setError,
  removeFilter,
  clearFilters,
  addCity,
  addLocation,
  addState,
  clearLocationFilter,
  removeCity,
  removeLocation,
  removeState,
  setLocationFilter,
  setProfession,
  addToCheckoutList,
  removeFromCheckoutList,
  addToNotInterested,
  clearNotInterested,
  setCheckoutList,
  setNotInterestedIds,
} = userSlice.actions;

export default userSlice.reducer;