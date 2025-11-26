import React, { useMemo, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
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

/* ---------- Custom filtering logic ---------- */
const filterOptions = (options: string[], search: string) => {
  if (!search) return []

  const query = search.toLowerCase()
  const startsFirst: string[] = []
  const startsOther: string[] = []
  const contains: string[] = []

  options.forEach((opt) => {
    const lower = opt.toLowerCase()
    const words = lower.split(" ")

    if (words[0].startsWith(query)) startsFirst.push(opt)
    else if (words.some((w, i) => i > 0 && w.startsWith(query)))
      startsOther.push(opt)
    else if (lower.includes(query)) contains.push(opt)
  })

  return [...startsFirst, ...startsOther, ...contains].slice(0, 10)
}

/* ---------- Component ---------- */
const MultiSelectCreatable = ({
  control,
  name,
  options,
  placeholder,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [], onChange: fieldChange } }) => {
        const filtered = useMemo(
          () => filterOptions(options, search),
          [options, search]
        )

        const addValue = (val: string) => {
          if (!val || value.includes(val)) return
          const updated = [...value, val]
          fieldChange(updated)
          onChange?.(updated)
          setSearch("")
          setOpen(false)
        }

        const removeValue = (val: string) => {
          const updated = value.filter((v: string) => v !== val)
          fieldChange(updated)
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
              {value.map((item: string) => (
                <View key={item} style={styles.chip}>
                  <Text style={styles.chipText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeValue(item)}>
                    <X size={14} color="#555" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Modal */}
            <Modal visible={open} transparent animationType="fade">
              <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={() => setOpen(false)}
              >
                <View style={styles.modal}>
                  <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder={placeholder}
                    style={styles.search}
                    autoFocus
                  />

                  {/* Create new */}
                  {search.length > 0 && !options.includes(search) && (
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

                  {/* Options */}
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={filtered}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => addValue(item)}
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
      }}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#fff",
  },
  placeholder: {
    color: "#9ca3af",
  },
  text: {
    color: "#111827",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    marginRight: 6,
    fontSize: 13,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: "70%",
    padding: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  option: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 14,
  },
})

export default MultiSelectCreatable