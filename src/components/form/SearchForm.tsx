import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

/* ✅ SAME COMPONENTS (not changed) */
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/Form";
import { Input } from "../ui/Input";
import {
  Select,
  // SelectContent,
  // SelectItem,
  // SelectTrigger,
  // SelectValue,
} from "../ui/Select";

/* ✅ SAME SCHEMA */
const formSchema = z.object({
  ageRange: z.object({
    min: z.number().min(18).max(60),
    max: z.number().min(18).max(60),
  }).refine((d) => d.min <= d.max),
  heightRange: z.object({
    min: z.number().min(140).max(220),
    max: z.number().min(140).max(220),
  }).refine((d) => d.min <= d.max),
  gender: z.enum(["MALE", "FEMALE"]),
  maritalStatus: z.enum(["SINGLE", "DIVORCED", "WIDOWED"]).optional(),
  location: z.string().optional(),
  educationDegree: z.string().optional(),
  profession: z.string().optional(),
  motherTongue: z.string().optional(),
  diet: z.enum(["VEGAN", "NON_VEGAN"]).optional(),
  familyType: z.enum(["JOINT", "NUCLEAR"]).optional(),
  smokingHabits: z.enum(["NEVER", "OCCASIONALLY", "REGULARLY"]).optional(),
  drinkingHabits: z.enum(["NEVER", "OCCASIONALLY", "REGULARLY"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SearchForm() {
  const navigation = useNavigation<any>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ageRange: { min: 18, max: 60 },
      heightRange: { min: 150, max: 180 },
      gender: "FEMALE",
      location: "",
      educationDegree: "",
      profession: "",
      motherTongue: "",
    },
  });

  function onSubmit(values: FormValues) {
    const filters = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        acc[key] = typeof value === "string" ? value.trim() : value;
      }
      return acc;
    }, {} as Record<string, any>);

    /* ✅ RN NAVIGATION (no query string) */
    navigation.navigate("Profile", { filters });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Profiles</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <View style={{ gap: 16 }}>
            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Looking for</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      placeholder="Select gender"
                      onValueChange={field.onChange}
                      options={[
                        { label: "Male", value: "MALE" },
                        { label: "Female", value: "FEMALE" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Age Range */}
            <FormLabel>Age Range</FormLabel>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <FormField
                control={form.control}
                name="ageRange.min"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      placeholder="Min"
                      keyboardType="numeric"
                      value={String(field.value)}
                      onChangeText={(v) => field.onChange(Number(v))}
                    />
                  </FormControl>
                )}
              />

              <FormField
                control={form.control}
                name="ageRange.max"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      placeholder="Max"
                      keyboardType="numeric"
                      value={String(field.value)}
                      onChangeText={(v) => field.onChange(Number(v))}
                    />
                  </FormControl>
                )}
              />
            </View>

            {/* Height Range */}
            <FormLabel>Height Range (cm)</FormLabel>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <FormField
                control={form.control}
                name="heightRange.min"
                render={({ field }) => (
                  <Input
                    placeholder="Min"
                    keyboardType="numeric"
                    value={String(field.value)}
                    onChangeText={(v) => field.onChange(Number(v))}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="heightRange.max"
                render={({ field }) => (
                  <Input
                    placeholder="Max"
                    keyboardType="numeric"
                    value={String(field.value)}
                    onChangeText={(v) => field.onChange(Number(v))}
                  />
                )}
              />
            </View>

            {/* Marital Status */}
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      placeholder="Select status"
                      onValueChange={field.onChange}
                      options={[
                        { label: "Single", value: "SINGLE" },
                        { label: "Divorced", value: "DIVORCED" },
                        { label: "Widowed", value: "WIDOWED" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter city or state"
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Education */}
            <FormField
              control={form.control}
              name="educationDegree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Education degree"
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Profession */}
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter profession"
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Mother Tongue */}
            <FormField
              control={form.control}
              name="motherTongue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother Tongue</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter mother tongue"
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Diet */}
            <FormField
              control={form.control}
              name="diet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diet</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      placeholder="Select diet"
                      onValueChange={field.onChange}
                      options={[
                        { label: "Vegan", value: "VEGAN" },
                        { label: "Non-Vegan", value: "NON_VEGAN" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Family Type */}
            <FormField
              control={form.control}
              name="familyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      placeholder="Select family type"
                      onValueChange={field.onChange}
                      options={[
                        { label: "Joint", value: "JOINT" },
                        { label: "Nuclear", value: "NUCLEAR" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Smoking Habits */}
            <FormField
              control={form.control}
              name="smokingHabits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Smoking Habits</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      placeholder="Select smoking habits"
                      onValueChange={field.onChange}
                      options={[
                        { label: "Never", value: "NEVER" },
                        { label: "Occasionally", value: "OCCASIONALLY" },
                        { label: "Regularly", value: "REGULARLY" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Drinking Habits */}
            <FormField
              control={form.control}
              name="drinkingHabits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drinking Habits</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      placeholder="Select drinking habits"
                      onValueChange={field.onChange}
                      options={[
                        { label: "Never", value: "NEVER" },
                        { label: "Occasionally", value: "OCCASIONALLY" },
                        { label: "Regularly", value: "REGULARLY" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button onPress={form.handleSubmit(onSubmit)}>
              Search Profiles
            </Button>
          </View>
        </Form>
      </CardContent>
    </Card>
  );
}