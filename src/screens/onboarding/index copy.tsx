import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
// import { Separator } from "../../components/ui/Separator";
import { RootState } from "../../store";
import Footer from "../../components/global/Footer";
import { DatePickerInput } from "../../components/global/DatePickerInput";

const Header = () => (
  <View style={styles.header}>
    {/* ✅ CORRECTED: Text wrapped in <Text> */}
    <Text style={styles.title}>Complete Basic Profile</Text>
    {/* <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Edit Profile</Text>  */}
  </View>
);

/* ---------------- SCHEMA ---------------- */

const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  dateOfBirth: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  caste: z.string(),
  currentLocation: z.object({
    city: z.string(),
    state: z.string(),
    mohalla: z.string(),
  }),
  canHelpOut: z.array(z.string()),
  canSeekHelp: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnBoardingScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      gender: "MALE",
      caste: "BHUMIHAR",
      currentLocation: { city: "", state: "", mohalla: "" },
      canHelpOut: [],
      canSeekHelp: [],
    },
  });

  useEffect(() => {
    if (user?.onBoardingCompleted) {
      Alert.alert("Info", "Profile already completed");
    }
  }, [user]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      console.log("Onboarding Data:", data);
      Alert.alert("Success", "Profile completed successfully!");
    } catch (e) {
      Alert.alert("Error", "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text style={styles.title}>Complete Basic Profile</Text> */}
        {/* <Text style={styles.subtitle}>Bhumihar Family</Text> */}

        {/* <Separator /> */}
        {/* Full Name */}
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <Input label="Full Name" value={field.value} onChange={field.onChange} />
          )}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input label="Email" value={field.value} onChange={field.onChange} />
          )}
        />

        {/* DOB */}
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <DatePickerInput
              label="Date of Birth"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Gender */}
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <SelectBox
              label="Gender"
              options={["MALE", "FEMALE", "OTHER"]}
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />

        {/* Location */}
        <Text style={styles.section}>Current Location</Text>
        <Controller
          control={control}
          name="currentLocation.city"
          render={({ field }) => (
            <Input label="City" value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="currentLocation.state"
          render={({ field }) => (
            <Input label="State" value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="currentLocation.mohalla"
          render={({ field }) => (
            <Input label="Mohalla" value={field.value} onChange={field.onChange} style={styles.input} />
          )}
        />

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Submit</Text>}
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Input({ label, value, onChange }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} onChangeText={onChange} style={styles.input} />
    </View>
  );
}

function SelectBox({ label, options, value, onSelect }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options.map((opt: string) => (
          <TouchableOpacity
            key={opt}
            style={[styles.option, value === opt && styles.optionActive]}
            onPress={() => onSelect(opt)}
          >
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ffffff' },
  title: { fontSize: 22, fontWeight: "700", textAlign: "left" },
  subtitle: { textAlign: "center", marginBottom: 20 },
  field: { marginBottom: 15 },
  label: { fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    borderColor: "#888",
  },
  header: {
    padding: 15,
    paddingTop: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-start",

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'relative',
    zIndex: 100,
  },
  section: { marginVertical: 10, fontWeight: "700" },
  row: { flexDirection: "row", gap: 10 },
  option: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 30,
  },
  optionActive: {
    backgroundColor: "#fc9246ff",
  },
  button: {
    backgroundColor: "#e25f01ff",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 22 },
});
