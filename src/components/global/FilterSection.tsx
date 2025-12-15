import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import {
  changeFilter,
  clearFilters,
  addState,
  addCity,
  removeCity,
  addLocation,
  removeLocation,
  clearLocationFilter,
  setProfession,
} from "../../store/slices/userSlice";
import { X } from "lucide-react-native";

import {
  PROFESSIONS,
  STATES,
  getCitiesForStates,
  getLocationsForCities,
} from "../../constants";
import MultiSelectCreatable from "./MultiSelectCreatable";
import DependentSelectComponent from "./DependentSelect";
import SelectComponent from "./SelectComponent";
import { HELP_OPTIONS } from "../../constants/help-option";

interface FilterSectionProps {
  type: "helpers" | "seekers";
  isMobile?: boolean;
  onClose?: () => void;
}

interface FilterFormValues {
  keywords: string[];
  state: string;
  city: string;
  location: string;
  profession: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  type,
  isMobile = false,
  onClose,
}) => {
  const dispatch = useDispatch();

  const { keywords, locationFilter, profession } = useSelector(
    (state: RootState) => state.user
  );

  const filterKey = type === "helpers" ? "canSeekHelp" : "canHelpOut";
  const selectedFilters = keywords[filterKey] || [];

  const form = useForm<FilterFormValues>({
    defaultValues: {
      keywords: selectedFilters,
      state: locationFilter.states[0] || "",
      city: locationFilter.cities[0] || "",
      location: locationFilter.locations[0] || "",
      profession: profession || "",
    },
  });

  /** ---------------- Effects ---------------- */

  useEffect(() => {
    if (selectedFilters.length > 0) {
      form.setValue("keywords", selectedFilters);
    }
  }, [selectedFilters, form]);

  useEffect(() => {
    if (
      selectedFilters.length === 0 &&
      !profession &&
      locationFilter.states.length === 0
    ) {
      form.reset({
        keywords: [],
        state: "",
        city: "",
        location: "",
        profession: "",
      });
    }
  }, [selectedFilters, profession, locationFilter, form]);

  const watchedProfession = form.watch("profession");
  const watchedState = form.watch("state");
  const watchedCity = form.watch("city");
  const watchedLocation = form.watch("location");

  useEffect(() => {
    if (watchedProfession !== undefined) {
      dispatch(setProfession(watchedProfession));
    }
  }, [watchedProfession, dispatch]);

  useEffect(() => {
    if (watchedState) {
      dispatch(clearLocationFilter());
      dispatch(addState(watchedState));
    }
  }, [watchedState, dispatch]);

  useEffect(() => {
    if (watchedCity) {
      locationFilter.cities.forEach((city) => dispatch(removeCity(city)));
      dispatch(addCity(watchedCity));
    }
  }, [watchedCity, dispatch]);

  useEffect(() => {
    if (watchedLocation) {
      locationFilter.locations.forEach((loc) =>
        dispatch(removeLocation(loc))
      );
      dispatch(addLocation(watchedLocation));
    }
  }, [watchedLocation, dispatch]);

  /** ---------------- Helpers ---------------- */

  const onKeywordsChange = (newKeywords: string[]) => {
    dispatch(clearFilters());
    newKeywords.forEach((keyword) => {
      dispatch(changeFilter({ category: filterKey, keyword }));
    });
  };

  const stateOptions = STATES.map((state) => ({
    value: state,
    label: state,
  }));

  const getCityOptions = (state: string) =>
    getCitiesForStates([state]).map((city) => ({
      value: city,
      label: city,
    }));

  const getLocationOptions = (city: string) =>
    getLocationsForCities([city]).map((loc) => ({
      value: loc,
      label: loc,
    }));

  const professionOptions = PROFESSIONS.map((prof) => ({
    value: prof,
    label: prof,
  }));

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(clearLocationFilter());
    form.reset({
      keywords: [],
      state: "",
      city: "",
      location: "",
      profession: "",
    });
  };

  const handleClearLocationFilter = () => {
    dispatch(clearLocationFilter());
    form.setValue("state", "");
    form.setValue("city", "");
    form.setValue("location", "");
  };

  /** ---------------- UI ---------------- */

  return (
    <ScrollView
      style={[styles.container, !isMobile && styles.card]}
      contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Filters</Text>

        {(selectedFilters.length > 0 ||
          profession ||
          locationFilter.states.length > 0) && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClearFilters}>
            <X size={16} color="#DC2626" />
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Keywords */}
      <Text style={styles.label}>Keywords</Text>
      <MultiSelectCreatable
        control={form.control}
        name="keywords"
        options={HELP_OPTIONS}
        placeholder="Search keywords..."
        onChange={onKeywordsChange}
      />

      {/* Location */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Location</Text>

        {(locationFilter.states.length > 0 ||
          locationFilter.cities.length > 0 ||
          locationFilter.locations.length > 0) && (
          <TouchableOpacity onPress={handleClearLocationFilter}>
            <Text style={styles.clearText}>Clear locations</Text>
          </TouchableOpacity>
        )}
      </View>

      <DependentSelectComponent
        control={form.control}
        parentName="state"
        childName="city"
        parentOptions={stateOptions}
        childOptionsMap={Object.fromEntries(
          STATES.map((state) => [state, getCityOptions(state)])
        )}
        parentLabel="State"
        childLabel="City"
        parentPlaceholder="Select state"
        childPlaceholder="Select city"
      />

      {watchedCity ? (
        <SelectComponent
          control={form.control}
          name="location"
          options={getLocationOptions(watchedCity)}
          label="Street / Mohalla"
          placeholder="Select location"
        />
      ) : null}

      {/* Profession */}
      <Text style={styles.label}>Profession</Text>
      <SelectComponent
        control={form.control}
        name="profession"
        options={professionOptions}
        placeholder="Select profession"
      />

      {/* Mobile Apply */}
      {isMobile && onClose && (
        <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
  },
  content: {
    padding: 16,
    gap: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  clearText: {
    color: "#DC2626",
    fontSize: 14,
    marginLeft: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  applyBtn: {
    marginTop: 16,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  applyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FilterSection;