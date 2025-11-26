import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Controller, UseFormReturn } from "react-hook-form";
import { X, ChevronDown } from "lucide-react-native";

interface MultiSelectProps {
  form: UseFormReturn<any>;
  field: string;
  label: string;
  options: string[];
  className?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectProps> = ({
  form,
  field,
  label,
  options,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={form.control}
      name={field}
      render={({ field: { value = [], onChange }, fieldState }) => {
        const handleAddItem = (item: string) => {
          if (!value.includes(item)) {
            onChange([...value, item]);
          }
          setOpen(false);
        };

        const handleRemoveItem = (index: number) => {
          const updated = value.filter((_: string, i: number) => i !== index);
          onChange(updated);
        };

        return (
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            {/* Trigger */}
            <TouchableOpacity
              style={styles.trigger}
              onPress={() => setOpen(true)}
            >
              <Text style={styles.placeholder}>
                Select {label.toLowerCase()}
              </Text>
              <ChevronDown size={18} color="#6b7280" />
            </TouchableOpacity>

            {/* Selected Tags */}
            <View style={styles.tags}>
              {value.map((item: string, index: number) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(index)}
                  >
                    <X size={14} color="#374151" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {fieldState.error && (
              <Text style={styles.errorText}>
                {fieldState.error.message}
              </Text>
            )}

            {/* Dropdown Modal */}
            <Modal visible={open} transparent animationType="fade">
              <TouchableOpacity
                style={styles.overlay}
                onPress={() => setOpen(false)}
              >
                <View style={styles.dropdown}>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => handleAddItem(item)}
                      >
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        );
      }}
    />
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#111827",
  },
  trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  placeholder: {
    fontSize: 14,
    color: "#6b7280",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    marginRight: 6,
    fontSize: 13,
    color: "#111827",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: 300,
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  optionText: {
    fontSize: 14,
    color: "#111827",
  },
  errorText: {
    marginTop: 4,
    color: "#dc2626",
    fontSize: 12,
  },
});
