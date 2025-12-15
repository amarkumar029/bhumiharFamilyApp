import React, { useState, forwardRef } from "react"
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native"

interface Option {
  label: string
  value: string
}

interface SelectProps {
  value?: string
  placeholder?: string
  options: Option[]
  onValueChange?: (value: string) => void
}

const Select = forwardRef<View, SelectProps>(
  ({ value, placeholder = "Select...", options, onValueChange }, ref) => {
    const [open, setOpen] = useState(false)

    const selectedOption = options.find(
      (opt) => opt.value === value
    )

    const handleSelect = (val: string) => {
      onValueChange?.(val)
      setOpen(false)
    }

    return (
      <View ref={ref}>
        {/* Trigger */}
        <TouchableOpacity
          style={styles.trigger}
          onPress={() => setOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.triggerText}>
            {selectedOption?.label ?? placeholder}
          </Text>
          <Text style={styles.caret}>▼</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={open}
          transparent
          animationType="fade"
          statusBarTranslucent   // ✅ Android fix
        >
          {/* ✅ Overlay */}
          <Pressable
            style={styles.overlay}
            onPress={() => setOpen(false)}
          >
            {/* ✅ STOP PRESS BUBBLING */}
            <Pressable
              style={styles.modal}
              onPress={() => {}}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      item.value === value && styles.selectedItem,
                    ]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        item.value === value &&
                          styles.selectedItemText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    )
  }
)

Select.displayName = "Select"
export { Select }

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  trigger: {
    height: 52,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  triggerText: {
    fontSize: 14,
    color: "#111827",
  },
  caret: {
    fontSize: 12,
    color: "#6b7280",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 24,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: "60%",
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  selectedItem: {
    backgroundColor: "#e0f2fe",
  },
  itemText: {
    fontSize: 14,
    color: "#111827",
  },
  selectedItemText: {
    fontWeight: "600",
    color: "#0369a1",
  },
})
