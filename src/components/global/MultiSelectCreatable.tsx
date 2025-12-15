import React, { useMemo, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native"
import { Controller, Control } from "react-hook-form"
import { X, Plus } from "lucide-react-native"

interface Props {
  control: Control<any>
  name: string
  options: string[]
  placeholder: string
  onChange?: (values: string[]) => void
}

/* ---------- ✅ SAFE filtering logic ---------- */
const filterOptions = (options: unknown[], search: string) => {
  if (!search?.trim()) return []

  const query = search.toLowerCase()

  return (options ?? [])
    .filter(
      (opt): opt is string =>
        typeof opt === "string" &&
        opt.toLowerCase().includes(query)
    )
    .slice(0, 10)
}

/* ---------- ✅ Component ---------- */
const MultiSelectCreatable = ({
  control,
  name,
  options = [], // ✅ default
  placeholder,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filteredOptions = useMemo(
    () => filterOptions(options, search),
    [options, search]
  )

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]} // ✅ MUST
      render={({ field }) => {
        const value: string[] = Array.isArray(field.value)
          ? field.value
          : []

        const addValue = (val: unknown) => {
          if (typeof val !== "string") return
          const cleanVal = val.trim()
          if (!cleanVal || value.includes(cleanVal)) return

          const updated = [...value, cleanVal]
          field.onChange(updated)
          onChange?.(updated)

          setSearch("")
          setOpen(false)
        }

        const removeValue = (val: string) => {
          const updated = value.filter((v) => v !== val)
          field.onChange(updated)
          onChange?.(updated)
        }

        return (
          <View>
            {/* Input */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => setOpen(true)}
              activeOpacity={0.8}
            >
              <Text style={value.length ? styles.text : styles.placeholder}>
                {value.length ? "Selected values" : placeholder}
              </Text>
            </TouchableOpacity>

            {/* Chips */}
            <View style={styles.chips}>
              {value.map((item, index) => (
                <View key={`${item}-${index}`} style={styles.chip}>
                  <Text style={styles.chipText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeValue(item)}>
                    <X size={14} color="#555" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Modal */}
            <Modal visible={open} transparent animationType="fade">
              <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
                <Pressable style={styles.modal}>
                  <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder={placeholder}
                    style={styles.search}
                    autoFocus
                  />

                  {/* ✅ Create new */}
                  {search.trim().length > 0 &&
                    !options?.some((opt) => opt === search) && (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => addValue(search)}
                      >
                        <Plus size={16} />
                        <Text style={styles.optionText}>
                          Create "{search}"
                        </Text>
                      </TouchableOpacity>
                    )}

                  {/* ✅ Options */}
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={filteredOptions}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => addValue(item)}
                      >
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </Pressable>
              </Pressable>
            </Modal>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  placeholder: { color: "#9ca3af", fontSize: 14 },
  text: { color: "#111827", fontSize: 14, fontWeight: "500" },
  chips: { flexDirection: "row", flexWrap: "wrap", marginTop: 10, gap: 8 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 13,
    color: "#1e3a8a",
    marginRight: 6,
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 14,
    maxHeight: "70%",
    paddingHorizontal: 12,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  search: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#f9fafb",
    marginBottom: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  optionText: { fontSize: 14, color: "#111827" },
})

export default MultiSelectCreatable
