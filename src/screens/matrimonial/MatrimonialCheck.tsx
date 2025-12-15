import React from "react";
import { Text, StyleSheet } from "react-native";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/Dialog";
import { Button } from "../../components/ui/Button"; // ✅ agar RN button hai
import { useNavigation } from "@react-navigation/native";

type MatrimonialCheckProps = {
  isMatrimonial: boolean;
};

export default function MatrimonialCheck({
  isMatrimonial,
}: MatrimonialCheckProps) {
  const navigation = useNavigation();

  return (
    <Dialog
      visible={!isMatrimonial}
      onClose={() => {}}
    >
      <DialogHeader>
        <DialogTitle>Complete Your Profile</DialogTitle>

        <DialogDescription>
          Your matrimonial profile is not completed. Please complete your{" "}
          <Text style={styles.highlight}>
            Matrimonial profile section
          </Text>{" "}
          to proceed.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button
          title="Complete Profile"
          onPress={() =>
            navigation.navigate(
              "Profile" as never,
              { page: "matrimonialdetails" } as never
            )
          }
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </DialogFooter>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  highlight: {
    color: "#2563EB", // blue-600
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#8B5CF6", // purple-500
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});