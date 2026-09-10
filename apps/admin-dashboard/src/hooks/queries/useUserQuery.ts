import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getUserById } from "@/servivces/users.service";
import type { User, ApiError } from "@/types/user";

export function useUserQuery(userId: string): UseQueryResult<User, ApiError> {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUserById(userId)
    ,
    enabled: !!userId,
  });
}