import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { LOCATIONS } from "@/constants/locations";
import { LocationsData } from "@/types/location";
import Ionicons from "react-native-vector-icons/Ionicons";

interface StateSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: any;
}

const StateSelector: React.FC<StateSelectorProps> = ({
  value,
  onChange,
  placeholder = "Select state",
  style,
}) => {
  const [visible, setVisible] = useState(false);

  const states = useMemo(
    () => ["OTHERS", ...Object.keys(LOCATIONS as LocationsData)],
    []
  );

  return (
    <View style={style}>
      {/* Trigger */}
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setVisible(true)}
      >
        <Text style={value ? styles.value : styles.placeholder}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#6b7280" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <FlatList
              data={states}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onChange(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>
                    {item === "OTHERS" ? "Others" : item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  placeholder: {
    color: "#9ca3af",
    fontSize: 14,
  },

  value: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "500",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: "70%",
  },

  item: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  itemText: {
    fontSize: 14,
    color: "#111827",
  },
});


export default StateSelector;
