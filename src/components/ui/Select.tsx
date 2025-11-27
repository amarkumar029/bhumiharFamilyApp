import React, { useState, forwardRef, ReactNode } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface SelectProps {
  children: ReactNode[];
  value?: string;
  placeholder?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onValueChange?: (value: string) => void;
}

const Select = forwardRef<any, SelectProps>(
  ({ children, value, placeholder = 'Select...', style, textStyle, onValueChange }, ref) => {
    const [open, setOpen] = useState(false);

    const selectedChild = children.find((child: any) => child.props.value === value);

    const handleSelect = (val: string) => {
      onValueChange?.(val);
      setOpen(false);
    };

    return (
      <View ref={ref}>
        <TouchableOpacity
          style={[styles.trigger, style]}
          onPress={() => setOpen(true)}
        >
          <Text style={[styles.triggerText, textStyle]}>
            {selectedChild ? selectedChild.props.children : placeholder}
          </Text>
          <Text style={styles.caret}>▼</Text>
        </TouchableOpacity>

        <Modal visible={open} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setOpen(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={children}
                keyExtractor={(item: any, index) => index.toString()}
                renderItem={({ item }: { item: any }) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      item.props.value === value && styles.selectedItem,
                    ]}
                    onPress={() => handleSelect(item.props.value)}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        item.props.value === value && styles.selectedItemText,
                      ]}
                    >
                      {item.props.children}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
);

Select.displayName = 'Select';

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

const SelectItem = ({ value, children }: SelectItemProps) => {
  return <>{children}</>; // Rendered inside FlatList in Select
};

SelectItem.displayName = 'SelectItem';

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 36,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  triggerText: {
    fontSize: 14,
    color: '#111827',
  },
  caret: {
    fontSize: 12,
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    maxHeight: 300,
    paddingVertical: 8,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  selectedItem: {
    backgroundColor: '#e0f2fe',
  },
  itemText: {
    fontSize: 14,
    color: '#111827',
  },
  selectedItemText: {
    fontWeight: '600',
    color: '#0c4a6e',
  },
});

export { Select, SelectItem };
