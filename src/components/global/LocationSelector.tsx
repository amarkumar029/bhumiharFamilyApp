import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LOCATIONS } from "../../constants/locations";
import { LocationSelectorProps, LocationsData } from "../../types/location";

const LocationSelector: React.FC<LocationSelectorProps> = ({ value, onChange }) => {
  const [selectedState, setSelectedState] = useState(value?.state || "");
  const [selectedCity, setSelectedCity] = useState(value?.city || "");
  const [selectedMohalla, setSelectedMohalla] = useState(value?.mohalla || "");

  const [customState, setCustomState] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [customMohalla, setCustomMohalla] = useState("");

  const [cities, setCities] = useState<string[]>([]);
  const [mohallas, setMohallas] = useState<string[]>([]);

  const states = ["OTHERS", ...Object.keys(LOCATIONS as LocationsData)];

  useEffect(() => {
    if (!value) return;

    // Handle state
    if (value.state) {
      if (states.includes(value.state)) setSelectedState(value.state);
      else {
        setSelectedState("OTHERS");
        setCustomState(value.state);
      }

      // Handle cities
      if (value.state !== "OTHERS" && LOCATIONS[value.state]) {
        const citiesForState = LOCATIONS[value.state];
        const cityOptions = ["OTHERS", ...Object.keys(citiesForState)];
        setCities(cityOptions);

        if (value.city) {
          if (cityOptions.includes(value.city)) setSelectedCity(value.city);
          else {
            setSelectedCity("OTHERS");
            setCustomCity(value.city);
          }

          // Handle mohallas
          if (value.city !== "OTHERS" && citiesForState[value.city]) {
            const mohallaOptions = ["OTHERS", ...citiesForState[value.city]];
            setMohallas(mohallaOptions);

            if (value.mohalla) {
              if (mohallaOptions.includes(value.mohalla)) setSelectedMohalla(value.mohalla);
              else {
                setSelectedMohalla("OTHERS");
                setCustomMohalla(value.mohalla);
              }
            }
          }
        }
      }
    }
  }, [value]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity("");
    setSelectedMohalla("");
    setCities([]);
    setMohallas([]);
    if (state !== "OTHERS") {
      const citiesForState = LOCATIONS[state];
      if (citiesForState) setCities(["OTHERS", ...Object.keys(citiesForState)]);
      onChange({ state, city: "", mohalla: "" });
    } else setCustomState("");
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedMohalla("");
    setMohallas([]);
    if (city !== "OTHERS" && selectedState !== "OTHERS") {
      const citiesForState = LOCATIONS[selectedState];
      if (citiesForState && citiesForState[city]) setMohallas(["OTHERS", ...citiesForState[city]]);
      onChange({ state: selectedState, city, mohalla: "" });
    } else setCustomCity("");
  };

  const handleMohallaChange = (mohalla: string) => {
    setSelectedMohalla(mohalla);
    if (mohalla !== "OTHERS") onChange({ state: selectedState, city: selectedCity, mohalla });
    else setCustomMohalla("");
  };

  const handleCustomChange = () => {
    onChange({
      state: selectedState === "OTHERS" ? customState : selectedState,
      city: selectedCity === "OTHERS" ? customCity : selectedCity,
      mohalla: selectedMohalla === "OTHERS" ? customMohalla : selectedMohalla,
    });
  };

  return (
    <View style={styles.container}>
      {/* State Selector */}
      <Text style={styles.label}>State</Text>
      <Picker
        selectedValue={selectedState}
        onValueChange={(val) => {
          handleStateChange(val);
        }}
      >
        {states.map((state) => (
          <Picker.Item key={state} label={state === "OTHERS" ? "Others" : state} value={state} />
        ))}
      </Picker>
      {selectedState === "OTHERS" && (
        <TextInput
          style={styles.input}
          placeholder="Enter your state"
          value={customState}
          onChangeText={(text) => {
            setCustomState(text);
            handleCustomChange();
          }}
        />
      )}

      {/* City Selector */}
      {selectedState && (
        <>
          <Text style={styles.label}>City</Text>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(val) => {
              handleCityChange(val);
            }}
          >
            {(selectedState === "OTHERS" ? ["OTHERS"] : cities).map((city) => (
              <Picker.Item key={city} label={city === "OTHERS" ? "Others" : city} value={city} />
            ))}
          </Picker>
          {selectedCity === "OTHERS" && (
            <TextInput
              style={styles.input}
              placeholder="Enter your city"
              value={customCity}
              onChangeText={(text) => {
                setCustomCity(text);
                handleCustomChange();
              }}
            />
          )}
        </>
      )}

      {/* Mohalla Selector */}
      {selectedState && selectedCity && (
        <>
          <Text style={styles.label}>Mohalla / Street</Text>
          <Picker
            selectedValue={selectedMohalla}
            onValueChange={(val) => {
              handleMohallaChange(val);
            }}
          >
            {(selectedState === "OTHERS" || selectedCity === "OTHERS" ? ["OTHERS"] : mohallas).map((mohalla) => (
              <Picker.Item key={mohalla} label={mohalla === "OTHERS" ? "Others" : mohalla} value={mohalla} />
            ))}
          </Picker>
          {selectedMohalla === "OTHERS" && (
            <TextInput
              style={styles.input}
              placeholder="Enter your mohalla/street"
              value={customMohalla}
              onChangeText={(text) => {
                setCustomMohalla(text);
                handleCustomChange();
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
    fontSize: 14,
    color: "#111827",
  },
});

export default LocationSelector;