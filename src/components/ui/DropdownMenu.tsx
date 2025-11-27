import React, { ReactNode, useState } from "react"
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native"

interface DropdownMenuProps {
  children: ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <>{children}</>
}

/* -------- Trigger -------- */

export function DropdownMenuTrigger({
  children,
  onPress,
}: {
  children: ReactNode
  onPress: () => void
}) {
  return <Pressable onPress={onPress}>{children}</Pressable>
}

/* -------- Content -------- */

export function DropdownMenuContent({
  visible,
  onClose,
  children,
}: {
  visible: boolean
  onClose: () => void
  children: ReactNode
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View />
      </Pressable>

      <View style={styles.menu}>{children}</View>
    </Modal>
  )
}

/* -------- Items -------- */

export function DropdownMenuItem({
  children,
  onPress,
  disabled,
}: {
  children: ReactNode
  onPress?: () => void
  disabled?: boolean
}) {
  return (
    <Pressable
      style={[styles.item, disabled && styles.disabled]}
      onPress={disabled ? undefined : onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

/* -------- Checkbox Item -------- */

export function DropdownMenuCheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <Pressable style={styles.item} onPress={onChange}>
      <Text style={styles.checkbox}>
        {checked ? "✓" : " "}
      </Text>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  )
}

/* -------- Radio Item -------- */

export function DropdownMenuRadioItem({
  label,
  selected,
  onSelect,
}: {
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <Pressable style={styles.item} onPress={onSelect}>
      <Text style={styles.checkbox}>
        {selected ? "●" : "○"}
      </Text>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  )
}

/* -------- Label -------- */

export function DropdownMenuLabel({ children }: { children: ReactNode }) {
  return <Text style={styles.label}>{children}</Text>
}

/* -------- Separator -------- */

export function DropdownMenuSeparator() {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  menu: {
    position: "absolute",
    top: 80,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 6,
    minWidth: 180,
    elevation: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
  },
  disabled: {
    opacity: 0.5,
  },
  checkbox: {
    width: 22,
    textAlign: "center",
    marginRight: 8,
  },
  label: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontWeight: "600",
    fontSize: 13,
    opacity: 0.7,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginVertical: 6,
  },
})
