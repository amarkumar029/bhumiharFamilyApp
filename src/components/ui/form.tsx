import React, { createContext, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewProps,
  TextProps,
} from "react-native"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

/* ✅ Form Provider */
export const Form = FormProvider

/* ------------------ Contexts ------------------ */

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null)

const FormItemContext = createContext<{ id: string } | null>(null)

/* ------------------ FormField ------------------ */

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/* ------------------ Hook ------------------ */

export function useFormField() {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext || !itemContext) {
    throw new Error("useFormField must be used within FormField & FormItem")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    name: fieldContext.name,
    error: fieldState.error,
    id: itemContext.id,
  }
}

/* ------------------ FormItem ------------------ */

export function FormItem({ children, style }: ViewProps) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <View style={[styles.item, style]}>{children}</View>
    </FormItemContext.Provider>
  )
}

/* ------------------ Label ------------------ */

export function FormLabel({ children, style }: TextProps) {
  const { error } = useFormField()

  return (
    <Text style={[styles.label, error && styles.errorText, style]}>
      {children}
    </Text>
  )
}

/* ------------------ Control ------------------ */

export function FormControl(props: React.ComponentProps<typeof TextInput>) {
  const { error } = useFormField()

  return (
    <TextInput
      {...props}
      style={[styles.input, error && styles.inputError, props.style]}
    />
  )
}

/* ------------------ Description ------------------ */

export function FormDescription({ children }: TextProps) {
  return <Text style={styles.description}>{children}</Text>
}

/* ------------------ Message ------------------ */

export function FormMessage({ children }: TextProps) {
  const { error } = useFormField()
  const message = error?.message || children

  if (!message) return null

  return <Text style={styles.message}>{message}</Text>
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#dc2626",
  },
  description: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  message: {
    marginTop: 4,
    fontSize: 12,
    color: "#dc2626",
    fontWeight: "500",
  },
  errorText: {
    color: "#dc2626",
  },
})
