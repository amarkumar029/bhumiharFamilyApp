import Toast from "react-native-toast-message";

export type ToastParams = {
  title?: string;
  description?: string;
  type?: "success" | "error" | "info";
};

export function toast({ title, description, type = "info" }: ToastParams) {
  Toast.show({
    type,
    text1: title,
    text2: description,
    position: "top",
    visibilityTime: 3000,
  });
}

export function useToast() {
  return {
    toast,
    success: (title: string, description?: string) =>
      toast({ title, description, type: "success" }),
    error: (title: string, description?: string) =>
      toast({ title, description, type: "error" }),
    info: (title: string, description?: string) =>
      toast({ title, description, type: "info" }),
  };
}