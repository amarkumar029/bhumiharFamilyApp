import React, { useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RNPickerSelect from "react-native-picker-select";
import MultiSelect from "./MultiSelectCreatable"; // You need a RN-compatible multi-select
import { Button } from "../ui/Button";
import { HELP_OPTIONS, PROFESSIONS, SECTORS } from "../../constants";
import { useUpdateCommunityDetails } from "../../lib/react-query/mutation";

const formSchema = z.object({
  canHelpOut: z.array(z.string()).optional(),
  canSeekHelp: z.array(z.string()).optional(),
  currentJobRole: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  hobbies: z.array(z.string()).optional(),
  profession: z.string().nullable().optional(),
  sector: z.string().optional(),
  income: z.object({
    min: z.string(),
    max: z.string(),
  }).optional(),
});

type CommunityDetailsFormProps = {
  data: any;
};

export default function CommunityDetailsForm({ data }: CommunityDetailsFormProps) {
  const { isPending, mutate } = useUpdateCommunityDetails();

  const initialValues = useMemo(
    () => ({
      ...data,
      canHelpOut:
        typeof data.canHelpOut === "string"
          ? JSON.parse(data.canHelpOut)
          : data.canHelpOut,
      canSeekHelp:
        typeof data.canSeekHelp === "string"
          ? JSON.parse(data.canSeekHelp)
          : data.canSeekHelp,
      achievements:
        typeof data.achievements === "string"
          ? JSON.parse(data.achievements)
          : data.achievements || [],
      hobbies:
        typeof data.hobbies === "string"
          ? JSON.parse(data.hobbies)
          : data.hobbies || [],
      sector: data.sector || "technology",
      income: data.income ? JSON.parse(data.income) : { min: "", max: "" },
      profession: data.profession || null,
      currentJobRole: data.currentJobRole || "",
    }),
    [data]
  );

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.header}>Community Details</Text>
      <Text style={styles.subHeader}>
        Tell us how you can contribute to and benefit from the community.
      </Text>

      {/* Areas You Can Help */}
      <Text style={styles.label}>Areas You Can Help In</Text>
      <Controller
        control={control}
        name="canHelpOut"
        render={({ field }) => (
          <MultiSelect
            options={HELP_OPTIONS}
            selectedValues={field.value || []}
            onChange={field.onChange}
            placeholder="Water Problem, Police case, Website Development, etc."
          />
        )}
      />

      {/* Areas You Need Help */}
      <Text style={styles.label}>Areas You Need Help In</Text>
      <Controller
        control={control}
        name="canSeekHelp"
        render={({ field }) => (
          <MultiSelect
            options={HELP_OPTIONS}
            selectedValues={field.value || []}
            onChange={field.onChange}
            placeholder="Court Case, Land issue, Election campaign, etc."
          />
        )}
      />

      {/* Profession */}
      <Text style={styles.label}>Profession</Text>
      <Controller
        control={control}
        name="profession"
        render={({ field }) => (
          <RNPickerSelect
            onValueChange={field.onChange}
            value={field.value || ""}
            placeholder={{ label: "Select your profession", value: null }}
            items={PROFESSIONS.map((p) => ({ label: p, value: p }))}
          />
        )}
      />

      {/* Sector */}
      <Text style={styles.label}>Sector</Text>
      <Controller
        control={control}
        name="sector"
        render={({ field }) => (
          <RNPickerSelect
            onValueChange={field.onChange}
            value={field.value || ""}
            placeholder={{ label: "Select your sector", value: "" }}
            items={SECTORS.map((s) => ({ label: s, value: s }))}
          />
        )}
      />

      {/* Current Job Role */}
      <Text style={styles.label}>Current Job Role</Text>
      <Controller
        control={control}
        name="currentJobRole"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="e.g. Software Engineer"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      {/* Achievements */}
      <Text style={styles.label}>Achievements</Text>
      <Controller
        control={control}
        name="achievements"
        render={({ field }) => (
          <MultiSelect
            options={[]}
            selectedValues={field.value || []}
            onChange={field.onChange}
            placeholder="Type your achievements and press enter"
          />
        )}
      />

      {/* Hobbies */}
      <Text style={styles.label}>Hobbies</Text>
      <Controller
        control={control}
        name="hobbies"
        render={({ field }) => (
          <MultiSelect
            options={[]}
            selectedValues={field.value || []}
            onChange={field.onChange}
            placeholder="Type your hobbies and press enter"
          />
        )}
      />

      {/* Income Range */}
      <Text style={styles.label}>Income Range (Monthly min and max)</Text>
      <View style={styles.incomeRow}>
        <Controller
          control={control}
          name="income"
          render={({ field }) => (
            <>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Min"
                keyboardType="numeric"
                value={field.value?.min || ""}
                onChangeText={(value) =>
                  field.onChange({ ...field.value, min: value.replace(/[^0-9]/g, "") })
                }
              />
              <Text style={styles.dash}>-</Text>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Max"
                keyboardType="numeric"
                value={field.value?.max || ""}
                onChangeText={(value) =>
                  field.onChange({ ...field.value, max: value.replace(/[^0-9]/g, "") })
                }
              />
            </>
          )}
        />
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        style={{ marginTop: 24 }}
      >
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 20, fontWeight: "600", marginBottom: 4 },
  subHeader: { fontSize: 14, color: "#6B7280", marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  incomeRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dash: { marginHorizontal: 8, fontSize: 16, color: "#6B7280" },
});
