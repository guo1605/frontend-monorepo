import { createUser } from "@/servivces/users.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatUser() {
  const queryClirnt = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClirnt.invalidateQueries({ queryKey: ['users'] });
    }
  })

  return {
    creatUser: mutate,
    isPending,
    isError,
    isSuccess
  };
}