import React, { createContext, useContext, useState } from "react"
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native"

/* -------------------- Context -------------------- */

type HoverCardContextType = {
  open: boolean
  setOpen: (v: boolean) => void
}

const HoverCardContext = createContext<HoverCardContextType | null>(null)

/* -------------------- Root -------------------- */

export function HoverCard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <HoverCardContext.Provider value={{ open, setOpen }}>
      {children}
    </HoverCardContext.Provider>
  )
}

/* -------------------- Trigger -------------------- */

export function HoverCardTrigger({
  children,
}: {
  children: React.ReactNode
}) {
  const ctx = useContext(HoverCardContext)
  if (!ctx) throw new Error("HoverCardTrigger must be used inside HoverCard")

  return (
    <Pressable
      onPressIn={() => ctx.setOpen(true)}
      onPressOut={() => ctx.setOpen(false)}
    >
      {children}
    </Pressable>
  )
}

/* -------------------- Content -------------------- */

export function HoverCardContent({
  children,
}: {
  children: React.ReactNode
}) {
  const ctx = useContext(HoverCardContext)
  if (!ctx) throw new Error("HoverCardContent must be used inside HoverCard")

  return (
    <Modal transparent visible={ctx.open} animationType="fade">
      <Pressable style={styles.backdrop} onPress={() => ctx.setOpen(false)}>
        <View style={styles.card}>{children}</View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 260,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
})
