import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LOCATIONS } from "../../constants/locations";
import { LocationSelectorProps } from "../../types/location";

const EMPTY_LOCATION = {
  state: "",
  city: "",
  mohalla: "",
};

const LocationSelector: React.FC<LocationSelectorProps> = ({
  value = EMPTY_LOCATION,
  onChange,
}) => {
  /* -------------------- LOCAL STATE -------------------- */
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMohalla, setSelectedMohalla] = useState("");

  const [customState, setCustomState] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [customMohalla, setCustomMohalla] = useState("");

  const [cities, setCities] = useState<string[]>([]);
  const [mohallas, setMohallas] = useState<string[]>([]);

  /* -------------------- SAFE LOCATIONS -------------------- */
  const safeLocations =
    LOCATIONS && typeof LOCATIONS === "object" ? LOCATIONS : {};

  const states = ["OTHERS", ...Object.keys(safeLocations)];

  /* -------------------- SYNC FROM VALUE -------------------- */
  useEffect(() => {
    if (!value.state) {
      setSelectedState("");
      setSelectedCity("");
      setSelectedMohalla("");
      return;
    }

    // ---- STATE ----
    if (states.includes(value.state)) {
      setSelectedState(value.state);
    } else {
      setSelectedState("OTHERS");
      setCustomState(value.state);
    }

    if (value.state === "OTHERS") return;

    const citiesForState = safeLocations[value.state];
    if (!citiesForState) return;

    const cityOptions = ["OTHERS", ...Object.keys(citiesForState)];
    setCities(cityOptions);

    // ---- CITY ----
    if (!value.city) return;

    if (cityOptions.includes(value.city)) {
      setSelectedCity(value.city);
    } else {
      setSelectedCity("OTHERS");
      setCustomCity(value.city);
    }

    if (value.city === "OTHERS") return;

    const mohallaList = citiesForState[value.city];
    if (!Array.isArray(mohallaList)) return;

    setMohallas(["OTHERS", ...mohallaList]);

    // ---- MOHALLA ----
    if (!value.mohalla) return;

    if (mohallaList.includes(value.mohalla)) {
      setSelectedMohalla(value.mohalla);
    } else {
      setSelectedMohalla("OTHERS");
      setCustomMohalla(value.mohalla);
    }
  }, [value]);

  /* -------------------- HANDLERS -------------------- */
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity("");
    setSelectedMohalla("");
    setCities([]);
    setMohallas([]);

    onChange({
      state,
      city: "",
      mohalla: "",
    });

    if (state === "OTHERS") return;

    const citiesForState = safeLocations[state];
    if (citiesForState) {
      setCities(["OTHERS", ...Object.keys(citiesForState)]);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedMohalla("");
    setMohallas([]);

    onChange({
      state: selectedState,
      city,
      mohalla: "",
    });

    if (city === "OTHERS") return;

    const citiesForState = safeLocations[selectedState];
    const mohallaList = citiesForState?.[city];

    if (Array.isArray(mohallaList)) {
      setMohallas(["OTHERS", ...mohallaList]);
    }
  };

  const handleMohallaChange = (mohalla: string) => {
    setSelectedMohalla(mohalla);

    if (mohalla === "OTHERS") return;

    onChange({
      state:
        selectedState === "OTHERS" ? customState : selectedState,
      city:
        selectedCity === "OTHERS" ? customCity : selectedCity,
      mohalla,
    });
  };

  /* -------------------- UI -------------------- */
  return (
    <View>
      {/* ---------- STATE ---------- */}
      <Text style={styles.label}>State</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedState}
          onValueChange={handleStateChange}
        >
          {states.map((state) => (
            <Picker.Item
              key={state}
              label={state === "OTHERS" ? "Others" : state}
              value={state}
            />
          ))}
        </Picker>
      </View>

      {selectedState === "OTHERS" && (
        <TextInput
          style={styles.input}
          placeholder="Enter your state"
          value={customState}
          onChangeText={setCustomState}
          onBlur={() =>
            onChange({ state: customState, city: "", mohalla: "" })
          }
        />
      )}

      {/* ---------- CITY ---------- */}
      {!!selectedState && (
        <>
          <Text style={styles.label}>City</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={handleCityChange}
            >
              {(selectedState === "OTHERS"
                ? ["OTHERS"]
                : cities
              ).map((city) => (
                <Picker.Item
                  key={city}
                  label={city === "OTHERS" ? "Others" : city}
                  value={city}
                />
              ))}
            </Picker>
          </View>

          {selectedCity === "OTHERS" && (
            <TextInput
              style={styles.input}
              placeholder="Enter your city"
              value={customCity}
              onChangeText={setCustomCity}
              onBlur={() =>
                onChange({
                  state: selectedState,
                  city: customCity,
                  mohalla: "",
                })
              }
            />
          )}
        </>
      )}

      {/* ---------- MOHALLA ---------- */}
      {!!selectedCity && (
        <>
          <Text style={styles.label}>Mohalla / Street</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMohalla}
              onValueChange={handleMohallaChange}
            >
              {(selectedCity === "OTHERS"
                ? ["OTHERS"]
                : mohallas
              ).map((m) => (
                <Picker.Item
                  key={m}
                  label={m === "OTHERS" ? "Others" : m}
                  value={m}
                />
              ))}
            </Picker>
          </View>

          {selectedMohalla === "OTHERS" && (
            <TextInput
              style={styles.input}
              placeholder="Enter your mohalla / street"
              value={customMohalla}
              onChangeText={setCustomMohalla}
              onBlur={() =>
                onChange({
                  state:
                    selectedState === "OTHERS"
                      ? customState
                      : selectedState,
                  city:
                    selectedCity === "OTHERS"
                      ? customCity
                      : selectedCity,
                  mohalla: customMohalla,
                })
              }
            />
          )}
        </>
      )}
    </View>
  );
};

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#374151",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    marginBottom: 8,
    overflow: "hidden",
  },
});

export default LocationSelector;