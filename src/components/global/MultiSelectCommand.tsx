import React, { useMemo, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native"
import { X } from "lucide-react-native"

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelectCommand({
  options,
  selected,
  onChange,
  placeholder = "Select options…",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const filteredOptions = useMemo(
    () =>
      options.filter(
        (opt) =>
          !selected.includes(opt) &&
          opt.toLowerCase().includes(inputValue.toLowerCase())
      ),
    [options, selected, inputValue]
  )

  const handleSelect = (item: string) => {
    onChange([...selected, item])
    setInputValue("")
    setOpen(false)
  }

  const handleRemove = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <View style={styles.container}>
      {/* Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={placeholder}
          style={styles.input}
          onFocus={() => setOpen(true)}
        />
      </View>

      {/* Selected badges */}
      {selected.length > 0 && (
        <View style={styles.badges}>
          {selected.map((item) => (
            <View key={item} style={styles.badge}>
              <Text style={styles.badgeText}>{item}</Text>
              <TouchableOpacity
                onPress={() => handleRemove(item)}
                hitSlop={8}
              >
                <X size={14} color="#6b7280" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Dropdown (Modal) */}
      <Modal transparent visible={open && filteredOptions.length > 0}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdrop}
          onPress={() => setOpen(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  input: {
    fontSize: 14,
    color: "#111827",
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 13,
    marginRight: 6,
    color: "#111827",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: 300,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  optionText: {
    fontSize: 14,
    color: "#111827",
  },
})
