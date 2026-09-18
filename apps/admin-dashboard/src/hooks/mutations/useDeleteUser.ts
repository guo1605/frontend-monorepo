import { deleteUser } from "@/services/users.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });

  return {
    deleteUser: mutate,
    isPending,
    isError
  }
}