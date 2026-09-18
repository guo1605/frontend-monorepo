import { mockDashboardData } from "@/data/dashboard.mock";
import type { DashboardData } from "@/types/dashboard";

export const getDashboard = async (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardData);
    }, 1000);
  });
}