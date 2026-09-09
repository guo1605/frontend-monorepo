import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { DashboardData, ApiError } from "@/types/dashboard"
import { getDashboard } from "@/servivces/dashboard";

export function useDashboardQuery(): UseQueryResult<DashboardData, ApiError> {
  return useQuery({
    queryKey: [''],
    queryFn: getDashboard
  });

}