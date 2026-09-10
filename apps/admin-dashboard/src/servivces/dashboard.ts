import { mockDashboardData } from "@/data/dashboard.mock";

export const getDashboard = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardData);
    }, 1000);
  });
}