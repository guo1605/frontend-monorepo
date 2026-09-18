import { getUsers } from "@/services/users.service";
import type { GetUsersParams, UsersResponse, ApiError } from "@/types/user";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";


export function useUsersQuery({ page, pageSize }: GetUsersParams): UseQueryResult<UsersResponse, ApiError> {
  return useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: async () => {
      return getUsers({ page, pageSize })
    }
  });
}