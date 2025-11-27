import React, { ReactNode } from "react"
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native"

interface DialogProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

export function Dialog({ visible, onClose, children }: DialogProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View />
      </Pressable>

      <View style={styles.centered}>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  )
}

/* ---------- Sub Components ---------- */

export function DialogHeader({ children }: { children: ReactNode }) {
  return <View style={styles.header}>{children}</View>
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.title}>{children}</Text>
}

export function DialogDescription({ children }: { children: ReactNode }) {
  return <Text style={styles.description}>{children}</Text>
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <View style={styles.footer}>{children}</View>
}

export function DialogClose({
  onPress,
  children,
}: {
  onPress: (event: GestureResponderEvent) => void
  children: ReactNode
}) {
  return (
    <Pressable onPress={onPress} style={styles.closeButton}>
      <Text>{children}</Text>
    </Pressable>
  )
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 6,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
})
