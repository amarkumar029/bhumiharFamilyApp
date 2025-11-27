import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

/* Enable animation on Android */
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

/* ================= Context ================= */

const CollapsibleContext = createContext<{
  open: boolean;
  toggle: () => void;
} | null>(null);

function useCollapsible() {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error('Collapsible components must be used within <Collapsible>');
  }
  return ctx;
}

/* ================= Root ================= */

export function Collapsible({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <CollapsibleContext.Provider value={{ open, toggle }}>
      <View>{children}</View>
    </CollapsibleContext.Provider>
  );
}

/* ================= Trigger ================= */

export function CollapsibleTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggle } = useCollapsible();

  return <Pressable onPress={toggle}>{children}</Pressable>;
}

/* ================= Content ================= */

export function CollapsibleContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useCollapsible();
  if (!open) return null;

  return <View>{children}</View>;
}