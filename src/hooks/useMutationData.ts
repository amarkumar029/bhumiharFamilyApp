import { MutationFunction, MutationKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./toast"; // React Native toast

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<any, any>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) onSuccess();

      toast({
        title: data?.status === 200 ? "Success" : "Error",
        description: data?.data || "Operation completed",
        type: data?.status === 200 ? "success" : "error",
      });
    },
    onSettled: async () => {
      if (queryKey) {
        await client.invalidateQueries({
          queryKey: [queryKey],
        });
      }
    },
  });

  return { mutate, isLoading };
};
