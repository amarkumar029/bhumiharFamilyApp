import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Switch,
  Pressable,
  ActivityIndicator,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Picker } from "@react-native-picker/picker"
import * as z from "zod"

import { LANGUAGES, SKILLS } from "@/constants"
import { useUpdatePersonalDetails } from "@/lib/react-query/mutation"
import { useDispatch } from "react-redux"
import { updateCredential } from "@/store/slices/authSlice"

import MultiSelectCreatable from "./MultiSelectCreatable.native"
import LocationSelector from "./LocationSelector.native"
import ProfileImageUpload from "./ProfileImageUpload.native"

const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dateOfBirth: z.string().optional(),
  languages: z.array(z.string()),
  skills: z.array(z.string()).optional(),
  bioData: z.string().optional(),
  isPhoneNumberPublic: z.boolean(),
  image: z.string().optional(),
  currentLocation: z
    .object({
      state: z.string(),
      city: z.string(),
      mohalla: z.string(),
    })
    .optional(),
})

export default function ProfileDetailsForm({ initialData }: any) {
  const dispatch = useDispatch()
  const { mutate, isPending } = useUpdatePersonalDetails()
  const [profileImage, setProfileImage] = useState<string>(
    initialData?.image || ""
  )

  const {
    control,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      languages: initialData?.languages || [],
      skills: initialData?.skills || [],
      isPhoneNumberPublic: initialData?.isPhoneNumberPublic || false,
    },
  })

  const onSubmit = (values: any) => {
    dispatch(updateCredential({ fullName: values.fullName }))
    mutate({
      ...values,
      image: profileImage,
      isProfileCompleted: true,
    })
    dispatch(updateCredential({ isProfileCompleted: true }))
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Personal Details</Text>

      <ProfileImageUpload
        value={profileImage}
        onChange={(url) => {
          setProfileImage(url)
          setValue("image", url)
        }}
      />

      {/* Full Name */}
      <Controller
        control={control}
        name="fullName"
        render={({ field }) => (
          <TextInput style={styles.input} placeholder="Full Name" {...field} />
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            editable={!initialData.email}
            {...field}
          />
        )}
      />

      {/* Phone */}
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            editable={!initialData.phoneNumber}
            {...field}
          />
        )}
      />

      {/* Phone visibility */}
      <View style={styles.row}>
        <Text>Show phone publicly</Text>
        <Switch
          value={watch("isPhoneNumberPublic")}
          onValueChange={(v) => setValue("isPhoneNumberPublic", v)}
        />
      </View>

      {/* Gender */}
      <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <Picker selectedValue={field.value} onValueChange={field.onChange}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="MALE" />
            <Picker.Item label="Female" value="FEMALE" />
            <Picker.Item label="Other" value="OTHER" />
          </Picker>
        )}
      />

      {/* Languages */}
      <MultiSelectCreatable
        name="languages"
        control={control}
        options={LANGUAGES}
        placeholder="Languages"
      />

      {/* Skills */}
      <MultiSelectCreatable
        name="skills"
        control={control}
        options={SKILLS}
        placeholder="Skills"
      />

      {/* Location */}
      <LocationSelector control={control} name="currentLocation" />

      {/* Bio */}
      <Controller
        control={control}
        name="bioData"
        render={({ field }) => (
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="About you"
            multiline
            {...field}
          />
        )}
      />

      {/* Submit */}
      <Pressable
        style={styles.button}
        disabled={isPending}
        onPress={handleSubmit(onSubmit)}>
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save Changes</Text>
        )}
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
})
