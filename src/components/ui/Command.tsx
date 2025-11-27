import React, { useState, createContext, useContext } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

/* ================= Context ================= */

const CommandContext = createContext<any>(null);

function useCommand() {
  return useContext(CommandContext);
}

/* ================= Root ================= */

export function Command({
  children,
  data = [],
  onSelect,
}: {
  children?: React.ReactNode;
  data: { label: string; value: string; group?: string }[];
  onSelect: (value: string) => void;
}) {
  const [query, setQuery] = useState('');

  const filtered = data.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <CommandContext.Provider value={{ query, setQuery, filtered, onSelect }}>
      <View style={styles.container}>{children}</View>
    </CommandContext.Provider>
  );
}

/* ================= Dialog ================= */

export function CommandDialog({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.dialog}>{children}</View>
      </Pressable>
    </Modal>
  );
}

/* ================= Input ================= */

export function CommandInput({ placeholder = 'Search…' }) {
  const { query, setQuery } = useCommand();

  return (
    <TextInput
      value={query}
      onChangeText={setQuery}
      placeholder={placeholder}
      style={styles.input}
      autoFocus
    />
  );
}

/* ================= List ================= */

export function CommandList() {
  const { filtered, onSelect } = useCommand();

  if (!filtered.length) {
    return <Text style={styles.empty}>No results found.</Text>;
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={item => item.value}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onSelect(item.value)}
          style={styles.item}
        >
          <Text style={styles.itemText}>{item.label}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },

  dialog: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    maxHeight: '80%',
  },

  container: {
    width: '100%',
  },

  input: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  item: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
  },

  itemText: {
    fontSize: 14,
  },

  empty: {
    textAlign: 'center',
    padding: 16,
    color: '#6b7280',
  },
});
