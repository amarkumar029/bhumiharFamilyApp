import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Button, Alert } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectComponent from "./SelectComponent"; // You need RN select component
import StateSelector from "./StateSelector"; // You need RN implementation
import MatrimonialImagesUpload from "./MatrimonialImagesUpload"; // RN version

// Define Zod schema
const formSchema = z.object({
  zodiacSign: z.string().min(1),
  maritalStatus: z.enum(["SINGLE","MARRIED","DIVORCED","WIDOWED"]),
  motherTongue: z.string().min(1),
  smokingHabits: z.enum(["OCCASIONALLY","REGULARLY","NEVER"]),
  diet: z.enum(["VEGAN","VEGETARIAN","NON_VEGAN"]),
  bodyType: z.enum(["SLIM","ATHLETIC","AVERAGE","PLUS_SIZE"]),
  familyType: z.enum(["JOINT","NUCLEAR"]),
  fatherOccupation: z.string().min(1),
  motherOccupation: z.string().min(1),
  height: z.number().min(122),
  weight: z.number().min(1),
  familyIncome: z.string().min(1),
  familyBasedOut: z.string().min(1),
  aboutFamily: z.string().min(1),
  expectations: z.string().min(1),
  siblings: z.array(
    z.object({
      name: z.string().min(1),
      gender: z.string().min(1),
      maritalStatus: z.string().min(1),
      profession: z.string().optional()
    })
  ).optional().default([])
});

type FormValues = z.infer<typeof formSchema>;

export default function MatrimonialDetailsForm({ data }: { data?: FormValues }) {
  const [customFamilyLocation, setCustomFamilyLocation] = useState("");
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zodiacSign: data?.zodiacSign || "",
      maritalStatus: data?.maritalStatus || "SINGLE",
      motherTongue: data?.motherTongue || "",
      smokingHabits: data?.smokingHabits || "NEVER",
      diet: data?.diet || "NON_VEGAN",
      bodyType: data?.bodyType || "AVERAGE",
      familyType: data?.familyType || "NUCLEAR",
      fatherOccupation: data?.fatherOccupation || "",
      motherOccupation: data?.motherOccupation || "",
      height: data?.height || 170,
      weight: data?.weight || 60,
      familyIncome: data?.familyIncome || "",
      familyBasedOut: data?.familyBasedOut || "",
      aboutFamily: data?.aboutFamily || "",
      expectations: data?.expectations || "",
      siblings: data?.siblings || [],
    },
  });

  const { fields: siblingFields, append: appendSibling, remove: removeSibling } = useFieldArray({
    control,
    name: "siblings",
  });

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
    Alert.alert("Saved!", "Matrimonial details submitted successfully");
  };

  const watchFamilyLocation = watch("familyBasedOut");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Basic Details</Text>

      {/* Zodiac Sign */}
      <SelectComponent
        control={control}
        name="zodiacSign"
        options={["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"]}
        label="Zodiac Sign"
      />

      {/* Marital Status */}
      <SelectComponent
        control={control}
        name="maritalStatus"
        options={["SINGLE","MARRIED","DIVORCED","WIDOWED"]}
        label="Marital Status"
      />

      {/* Height */}
      <Controller
        control={control}
        name="height"
        render={({ field }) => (
          <View style={styles.field}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(field.value)}
              onChangeText={(val) => field.onChange(Number(val))}
            />
          </View>
        )}
      />

      {/* Weight */}
      <Controller
        control={control}
        name="weight"
        render={({ field }) => (
          <View style={styles.field}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(field.value)}
              onChangeText={(val) => field.onChange(Number(val))}
            />
          </View>
        )}
      />

      {/* Family Location */}
      <Controller
        control={control}
        name="familyBasedOut"
        render={({ field }) => (
          <View style={styles.field}>
            <Text style={styles.label}>Family Location</Text>
            <StateSelector
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                if (val !== "OTHERS") setCustomFamilyLocation("");
              }}
            />
            {field.value === "OTHERS" && (
              <TextInput
                style={[styles.input, { marginTop: 5 }]}
                placeholder="Enter custom location"
                value={customFamilyLocation}
                onChangeText={(val) => {
                  setCustomFamilyLocation(val);
                  field.onChange(val);
                }}
              />
            )}
          </View>
        )}
      />

      {/* Family Income */}
      <Controller
        control={control}
        name="familyIncome"
        render={({ field }) => (
          <View style={styles.field}>
            <Text style={styles.label}>Family Income (₹)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={field.value}
              onChangeText={(val) => field.onChange(val.replace(/[^0-9]/g, ""))}
            />
          </View>
        )}
      />

      {/* About Family */}
      <Controller
        control={control}
        name="aboutFamily"
        render={({ field }) => (
          <View style={styles.field}>
            <Text style={styles.label}>About Family</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              multiline
              value={field.value}
              onChangeText={field.onChange}
            />
          </View>
        )}
      />

      {/* Siblings */}
      <Text style={styles.sectionTitle}>Siblings</Text>
      {siblingFields.map((field, index) => (
        <View key={field.id} style={styles.sibling}>
          <Controller
            control={control}
            name={`siblings.${index}.name`}
            render={({ field }) => (
              <TextInput style={styles.input} placeholder="Name" value={field.value} onChangeText={field.onChange} />
            )}
          />
          <Controller
            control={control}
            name={`siblings.${index}.gender`}
            render={({ field }) => (
              <TextInput style={styles.input} placeholder="Gender" value={field.value} onChangeText={field.onChange} />
            )}
          />
          <Controller
            control={control}
            name={`siblings.${index}.maritalStatus`}
            render={({ field }) => (
              <TextInput style={styles.input} placeholder="Marital Status" value={field.value} onChangeText={field.onChange} />
            )}
          />
          <Controller
            control={control}
            name={`siblings.${index}.profession`}
            render={({ field }) => (
              <TextInput style={styles.input} placeholder="Profession (optional)" value={field.value} onChangeText={field.onChange} />
            )}
          />
          <Button title="Remove Sibling" onPress={() => removeSibling(index)} />
        </View>
      ))}
      <Button title="Add Sibling" onPress={() => appendSibling({ name: "", gender: "", maritalStatus: "", profession: "" })} />

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={{ color: "white" }}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  field: { marginBottom: 12 },
  label: { marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8 },
  sibling: { marginBottom: 12, padding: 8, borderWidth: 1, borderColor: "#ddd", borderRadius: 6 },
  submitButton: { marginTop: 16, backgroundColor: "#007bff", padding: 12, borderRadius: 6, alignItems: "center" },
});
