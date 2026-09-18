import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "@/services/users.service";

export function useEditUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editUser,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['users', variables.id]
      });
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
      queryClient.invalidateQueries({
        queryKey: ['dashboard']
      });
    }
  });

  return {
    updateUser: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
}