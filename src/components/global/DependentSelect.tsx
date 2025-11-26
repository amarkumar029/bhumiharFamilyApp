import React from "react";
import { View, StyleSheet } from "react-native";
import { Control, useWatch } from "react-hook-form";
import SelectComponent, { Option } from "./SelectComponent";

type DependentSelectProps = {
  control: Control<any>;
  parentName: string;
  childName: string;
  parentOptions: Option[];
  childOptionsMap: Record<string, Option[]>;
  parentLabel?: string;
  childLabel?: string;
  parentPlaceholder?: string;
  childPlaceholder?: string;
  isParentMulti?: boolean;
  isChildMulti?: boolean;
  isParentCreatable?: boolean;
  isChildCreatable?: boolean;
  parentDisabled?: boolean;
  childDisabled?: boolean;
};

const DependentSelectComponent: React.FC<DependentSelectProps> = ({
  control,
  parentName,
  childName,
  parentOptions,
  childOptionsMap,
  parentLabel,
  childLabel,
  parentPlaceholder,
  childPlaceholder,
  isParentMulti = false,
  isChildMulti = false,
  isParentCreatable = false,
  isChildCreatable = false,
  parentDisabled = false,
  childDisabled = false,
}) => {
  const parentValue = useWatch({
    control,
    name: parentName,
  });

  const childOptions = parentValue ? childOptionsMap[parentValue] || [] : [];

  return (
    <View style={styles.container}>
      <SelectComponent
        control={control}
        name={parentName}
        options={parentOptions}
        label={parentLabel}
        placeholder={parentPlaceholder}
        isMulti={isParentMulti}
        isCreatable={isParentCreatable}
        disabled={parentDisabled}
      />

      <SelectComponent
        control={control}
        name={childName}
        options={childOptions}
        label={childLabel}
        placeholder={childPlaceholder}
        isMulti={isChildMulti}
        isCreatable={isChildCreatable}
        disabled={childDisabled || !parentValue}
      />
    </View>
  );
};

export default DependentSelectComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    gap: 12, // spacing between parent and child selects
  },
});