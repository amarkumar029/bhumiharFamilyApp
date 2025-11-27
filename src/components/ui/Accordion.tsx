import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Enable animation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* ================= Accordion ================= */

export function Accordion({ children }: { children: React.ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

/* ================= Accordion Item ================= */

export function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={styles.item}>
      <AccordionTrigger title={title} open={open} onPress={toggle} />
      {open && <AccordionContent>{children}</AccordionContent>}
    </View>
  );
}

/* ================= Trigger ================= */

function AccordionTrigger({
  title,
  open,
  onPress,
}: {
  title: string;
  open: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.trigger} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.chevron, open && styles.chevronOpen]}>
        ▼
      </Text>
    </TouchableOpacity>
  );
}

/* ================= Content ================= */

function AccordionContent({ children }: { children: React.ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },

  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },

  chevron: {
    fontSize: 14,
    color: '#6b7280',
    transform: [{ rotate: '0deg' }],
  },

  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },

  content: {
    paddingBottom: 16,
  },
});
