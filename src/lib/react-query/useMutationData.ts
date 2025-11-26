import { useMutation, useQueryClient, MutationFunction, MutationKey } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<any, any>,
  queryKey?: string[],
  onSuccess?: () => void,
  toastOn?: boolean
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationKey,
    mutationFn,

    onSuccess: (data: any) => {
      // run custom success callback
      if (onSuccess) onSuccess();

      // show toast if enabled
      if (!toastOn) {
        if (data?.success) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: data?.message || "Operation completed",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Failed",
            text2: data?.message || "Something went wrong",
          });
        }
      }
    },

    onSettled: async () => {
      // invalidate queries if provided
      if (queryKey) {
        await Promise.all(
          queryKey.map((key) =>
            queryClient.invalidateQueries({ queryKey: [key] })
          )
        );
      }
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    data,
  };
};
