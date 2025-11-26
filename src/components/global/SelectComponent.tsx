import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Controller, Control } from "react-hook-form";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

export type Option = {
  label: string;
  value: any;
};

type Props = {
  control: Control<any>;
  name: string;
  options: Option[] | string[];
  label?: string;
  placeholder?: string;
  isMulti?: boolean;
  disabled?: boolean;
  defaultValue?: any;
};

const formatOptions = (opts: Option[] | string[]): Option[] => {
  if (opts.length === 0) return [];
  if (typeof opts[0] === "string") {
    return (opts as string[]).map((v) => ({ label: v, value: v }));
  }
  return opts as Option[];
};

const SelectComponent: React.FC<Props> = ({
  control,
  name,
  options,
  label,
  placeholder = "Select...",
  isMulti = false,
  disabled = false,
  defaultValue,
}) => {
  const formattedOptions = formatOptions(options);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            {isMulti ? (
              <MultiSelect
                style={styles.dropdown}
                placeholder={placeholder}
                value={value || []}
                data={formattedOptions}
                labelField="label"
                valueField="value"
                onChange={(item) => onChange(item)}
                disable={disabled}
                selectedStyle={styles.selected}
              />
            ) : (
              <Dropdown
                style={styles.dropdown}
                placeholder={placeholder}
                data={formattedOptions}
                labelField="label"
                valueField="value"
                value={value}
                onChange={(item) => onChange(item.value)}
                disable={disabled}
              />
            )}

            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default SelectComponent;

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  selected: {
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 6,
    marginTop: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
