import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export function DatePickerInput({ label, value, onChange }: any) {
  const [show, setShow] = useState(false);

  const handleChange = (_: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      onChange(formattedDate);
    }
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontWeight: "600", marginBottom: 6 }}>{label}</Text>

      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          height: 52,
          borderWidth: 1,
          borderColor: "#ccc",
          paddingHorizontal: 12,
          paddingVertical: 15,
          borderRadius: 6,
        }}
      >
        <Text>{value || "Select Date"}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={new Date()} // DOB future nahi ho sakta ✅
        />
      )}
    </View>
  );
}
