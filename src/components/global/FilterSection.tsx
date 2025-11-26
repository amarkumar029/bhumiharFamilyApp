import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
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
import { Button } from "../ui/button";
import MultiSelectCreatable from "./MultiSelectCreatable";
import DependentSelectComponent from "./DependentSelectComponent";
import SelectComponent from "./SelectComponent";
import { HELP_OPTIONS, PROFESSIONS, STATES, getCitiesForStates, getLocationsForCities } from "../../constants";

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

const FilterSection: React.FC<FilterSectionProps> = ({ type, isMobile = false, onClose }) => {
  const dispatch = useDispatch();
  const { keywords, locationFilter, profession } = useSelector((state: RootState) => state.user);
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

  const watchedState = form.watch("state");
  const watchedCity = form.watch("city");
  const watchedLocation = form.watch("location");
  const watchedProfession = form.watch("profession");

  useEffect(() => {
    if (selectedFilters.length > 0) form.setValue("keywords", selectedFilters);
  }, [selectedFilters]);

  useEffect(() => {
    if (watchedProfession !== undefined) dispatch(setProfession(watchedProfession));
  }, [watchedProfession]);

  useEffect(() => {
    if (watchedState) {
      dispatch(clearLocationFilter());
      dispatch(addState(watchedState));
    }
  }, [watchedState]);

  useEffect(() => {
    if (watchedCity) {
      locationFilter.cities.forEach((city) => dispatch(removeCity(city)));
      dispatch(addCity(watchedCity));
    }
  }, [watchedCity]);

  useEffect(() => {
    if (watchedLocation) {
      locationFilter.locations.forEach((loc) => dispatch(removeLocation(loc)));
      dispatch(addLocation(watchedLocation));
    }
  }, [watchedLocation]);

  const onKeywordsChange = (newKeywords: string[]) => {
    dispatch(clearFilters());
    newKeywords.forEach((keyword) => dispatch(changeFilter({ category: filterKey, keyword })));
  };

  const stateOptions = STATES.map((state) => ({ label: state, value: state }));
  const getCityOptions = (state: string) => getCitiesForStates([state]).map((c) => ({ label: c, value: c }));
  const getLocationOptions = (city: string) => getLocationsForCities([city]).map((l) => ({ label: l, value: l }));
  const professionOptions = PROFESSIONS.map((p) => ({ label: p, value: p }));

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(clearLocationFilter());
    form.reset({ keywords: [], state: "", city: "", location: "", profession: "" });
  };

  const handleClearLocationFilter = () => {
    dispatch(clearLocationFilter());
    form.setValue("state", "");
    form.setValue("city", "");
    form.setValue("location", "");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        {(selectedFilters.length > 0 || profession || locationFilter.states.length > 0) && (
          <Button onPress={handleClearFilters} style={styles.clearButton} title="Clear all" />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Keywords</Text>
        <MultiSelectCreatable
          control={form.control}
          name="keywords"
          options={HELP_OPTIONS}
          placeholder="Search keywords..."
          onChange={onKeywordsChange}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.subHeader}>
          <Text style={styles.subTitle}>Location</Text>
          {(locationFilter.states.length > 0 ||
            locationFilter.cities.length > 0 ||
            locationFilter.locations.length > 0) && (
            <Button onPress={handleClearLocationFilter} style={styles.clearButton} title="Clear locations" />
          )}
        </View>

        <DependentSelectComponent
          control={form.control}
          parentName="state"
          childName="city"
          parentOptions={stateOptions}
          childOptionsMap={Object.fromEntries(STATES.map((s) => [s, getCityOptions(s)]))}
          parentLabel="State"
          childLabel="City"
          parentPlaceholder="Select state..."
          childPlaceholder="Select city..."
        />

        {watchedCity ? (
          <SelectComponent
            control={form.control}
            name="location"
            options={getLocationOptions(watchedCity)}
            label="Street / Mohalla"
            placeholder="Select location..."
          />
        ) : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Profession</Text>
        <SelectComponent
          control={form.control}
          name="profession"
          options={professionOptions}
          placeholder="Select profession..."
        />
      </View>

      {isMobile && onClose && (
        <Button onPress={onClose} style={styles.applyButton} title="Apply Filters" />
      )}
    </ScrollView>
  );
};

export default FilterSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "600" },
  clearButton: { backgroundColor: "#fef2f2", color: "#b91c1c" },
  section: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 8 },
  subHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  subTitle: { fontSize: 16, fontWeight: "600" },
  applyButton: { backgroundColor: "#2563eb", color: "#fff", padding: 12, borderRadius: 6 },
});
