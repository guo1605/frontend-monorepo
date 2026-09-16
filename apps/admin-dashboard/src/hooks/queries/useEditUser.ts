import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "@/servivces/users.service";

export function useEditUser() {
  const queryClirnt = useQueryClient();

  const mutation = useMutation({
    mutationFn: editUser,
    onSuccess: async (_, variables) => {
      await queryClirnt.invalidateQueries({
        queryKey: ['users', variables.id]
      });
      queryClirnt.invalidateQueries({
        queryKey: ['users']
      });
      queryClirnt.invalidateQueries({
        queryKey: ['dashboard']
      });
    }
  });

  return {
    editUser: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
}