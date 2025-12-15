import React, { useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSearchProfiles } from "../../../../lib/react-query/queries";
import { SearchFilters } from "../../../../types/matrimonial";
import MatrimonialProfileCard from "../../../../components/global/MatrimonialProfiles"; // Assume RN version

type RouteParams = {
  ageRange?: string;
  heightRange?: string;
  gender?: string;
  maritalStatus?: string;
  location?: string;
  educationDegree?: string;
  profession?: string;
  motherTongue?: string;
  familyType?: string;
  diet?: string;
  smokingHabits?: string;
  drinkingHabits?: string;
};

function SearchResults() {
  const route = useRoute();
  const params = route.params as RouteParams;

  // Parse search params with validation
  const parseJSONParam = (param: string | undefined) => {
    if (!param) return undefined;
    try {
      return JSON.parse(decodeURIComponent(param));
    } catch (error) {
      console.error(`Error parsing JSON param: ${param}`, error);
      return undefined;
    }
  };

  const validateEnum = <T extends string>(value: string | undefined, validValues: T[]): T | undefined => {
    if (!value) return undefined;
    return validValues.includes(value as T) ? (value as T) : undefined;
  };

  const validateStringParam = (param: string | undefined): string | undefined => {
    if (!param || param.trim() === "") return undefined;
    return param.trim();
  };

  const filters: SearchFilters = useMemo(() => {
    const parsedFilters: SearchFilters = {
      ageRange: parseJSONParam(params.ageRange),
      heightRange: parseJSONParam(params.heightRange),
      gender: validateEnum(params.gender, ["MALE", "FEMALE"]) || "FEMALE",
      maritalStatus: validateEnum(params.maritalStatus, ["SINGLE", "DIVORCED", "WIDOWED"]),
      location: validateStringParam(params.location),
      educationDegree: validateStringParam(params.educationDegree),
      profession: validateStringParam(params.profession),
      motherTongue: validateStringParam(params.motherTongue),
      familyType: validateEnum(params.familyType, ["JOINT", "NUCLEAR"]),
      diet: validateEnum(params.diet, ["VEGAN", "NON_VEGAN"]),
      smokingHabits: validateEnum(params.smokingHabits, ["OCCASIONALLY", "NEVER", "REGULAR"]),
      drinkingHabits: validateEnum(params.drinkingHabits, ["NEVER", "OCCASIONALLY", "REGULAR"]),
    };

    // Validate age range
    if (parsedFilters.ageRange) {
      const { min, max } = parsedFilters.ageRange;
      if (typeof min !== "number" || typeof max !== "number" || min < 18 || max > 60 || min > max) {
        delete parsedFilters.ageRange;
      }
    }

    // Validate height range
    if (parsedFilters.heightRange) {
      const { min, max } = parsedFilters.heightRange;
      if (typeof min !== "number" || typeof max !== "number" || min < 140 || max > 220 || min > max) {
        delete parsedFilters.heightRange;
      }
    }

    return Object.fromEntries(
      Object.entries(parsedFilters).filter(([_, value]) => value !== undefined)
    ) as SearchFilters;
  }, [params]);

  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useSearchProfiles(filters);

  const profiles = data?.pages.flatMap((page) => page.profiles) || [];
  const totalProfiles = data?.pages?.[0]?.total || 0;

  const handleSendInterest = async (profileId: string) => {
    try {
      console.log("Sending interest to profile:", profileId);
      // Implement send interest logic here
    } catch (error) {
      console.error("Error sending interest:", error);
    }
  };

  const generateSearchSummary = () => {
    const activeFilters = [];
    if (filters.gender) activeFilters.push(`Looking for ${filters.gender.toLowerCase()}`);
    if (filters.ageRange) activeFilters.push(`Age: ${filters.ageRange.min}-${filters.ageRange.max}`);
    if (filters.heightRange) activeFilters.push(`Height: ${filters.heightRange.min}-${filters.heightRange.max}cm`);
    if (filters.location) activeFilters.push(`Location: ${filters.location}`);
    if (filters.maritalStatus) activeFilters.push(`Status: ${filters.maritalStatus.toLowerCase()}`);
    if (filters.educationDegree) activeFilters.push(`Education: ${filters.educationDegree}`);
    if (filters.profession) activeFilters.push(`Profession: ${filters.profession}`);
    if (filters.motherTongue) activeFilters.push(`Mother Tongue: ${filters.motherTongue}`);
    if (filters.diet) activeFilters.push(`Diet: ${filters.diet.toLowerCase()}`);
    if (filters.familyType) activeFilters.push(`Family: ${filters.familyType.toLowerCase()}`);
    if (filters.smokingHabits) activeFilters.push(`Smoking: ${filters.smokingHabits.toLowerCase()}`);
    if (filters.drinkingHabits) activeFilters.push(`Drinking: ${filters.drinkingHabits.toLowerCase()}`);
    return activeFilters.length > 0 ? activeFilters.join(" • ") : "All profiles";
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading profiles: {JSON.stringify(error) || "Try again"}</Text>
      </View>
    );
  }

  if (totalProfiles === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.infoText}>No profiles found</Text>
        <Text style={styles.infoSubText}>Try adjusting your search criteria.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results ({totalProfiles} profiles found)</Text>
      <Text style={styles.summary}>{generateSearchSummary()}</Text>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatrimonialProfileCard profile={item} onSendInterest={handleSendInterest} />
        )}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 4 },
  summary: { fontSize: 14, color: "#6B7280", marginBottom: 16 },
  errorText: { color: "#B91C1C", fontSize: 16 },
  infoText: { color: "#1D4ED8", fontSize: 18, fontWeight: "500" },
  infoSubText: { color: "#2563EB", fontSize: 14 },
});

export default SearchResults;
